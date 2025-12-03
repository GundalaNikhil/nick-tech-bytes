// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    ME: `${API_BASE_URL}/auth/me`,
    VALIDATE: `${API_BASE_URL}/auth/validate`,
    HEALTH: `${API_BASE_URL}/auth/health`,
    CHECK_USERNAME: `${API_BASE_URL}/auth/check-username`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  },
  MOCK_INTERVIEWS: {
    BASE: `${API_BASE_URL}/mock-interviews`,
    CREATE: `${API_BASE_URL}/mock-interviews`,
    LIST: `${API_BASE_URL}/mock-interviews`,
    PAGINATED: `${API_BASE_URL}/mock-interviews/paginated`,
    COUNT: `${API_BASE_URL}/mock-interviews/count`,
    BY_ID: (id: number) => `${API_BASE_URL}/mock-interviews/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/mock-interviews/${id}`,
    ADMIN_ALL: `${API_BASE_URL}/mock-interviews/admin/all`,
  },
} as const;

export interface ApiError {
  status: number;
  error: string;
  message: string;
  path: string;
  timestamp: string;
  validationErrors?: Array<{
    field: string;
    message: string;
    rejectedValue: any;
  }>;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: {
    id: number;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    role: string;
    emailVerified: boolean;
  };
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface LoginRequest {
  emailOrUsername: string;
  password: string;
  rememberMe?: boolean;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface TokenValidationResponse {
  valid: boolean;
  email?: string;
  username?: string;
  role?: string;
  userId?: number;
  message: string;
}

export interface MockInterviewRequest {
  name: string;
  email: string;
  phone: string;
  currentRole: string;
  targetRole: string;
  experience: string;
  preferredDate: string;
  preferredTime: string;
  technicalFocus: string[];
  additionalNotes?: string;
}

export interface MockInterviewResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  currentRole: string;
  targetRole: string;
  experience: string;
  preferredDate: string;
  preferredTime: string;
  technicalFocus: string[];
  additionalNotes?: string;
  status:
    | "PENDING"
    | "SCHEDULED"
    | "CONFIRMED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED"
    | "NO_SHOW";
  scheduledAt?: string;
  assignedInterviewer?: string;
  feedback?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface MockInterviewPage {
  content: MockInterviewResponse[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

// Token Storage Manager
class TokenStorage {
  private static instance: TokenStorage;
  private useLocalStorage: boolean = false;

  private constructor() {}

  static getInstance(): TokenStorage {
    if (!TokenStorage.instance) {
      TokenStorage.instance = new TokenStorage();
    }
    return TokenStorage.instance;
  }

  setRememberMe(remember: boolean) {
    this.useLocalStorage = remember;
  }

  private getStorage(): Storage | null {
    if (typeof window === "undefined") return null;
    return this.useLocalStorage ? localStorage : sessionStorage;
  }

  setAccessToken(token: string) {
    const storage = this.getStorage();
    if (storage) {
      storage.setItem("accessToken", token);
    }
  }

  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return (
      sessionStorage.getItem("accessToken") ||
      localStorage.getItem("accessToken")
    );
  }

  setRefreshToken(token: string) {
    const storage = this.getStorage();
    if (storage) {
      storage.setItem("refreshToken", token);
    }
  }

  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return (
      sessionStorage.getItem("refreshToken") ||
      localStorage.getItem("refreshToken")
    );
  }

  setUser(user: AuthResponse["user"]) {
    const storage = this.getStorage();
    if (storage) {
      storage.setItem("user", JSON.stringify(user));
    }
  }

  getUser(): AuthResponse["user"] | null {
    if (typeof window === "undefined") return null;
    const userStr =
      sessionStorage.getItem("user") || localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  setTokenExpiry(expiresIn: number) {
    const storage = this.getStorage();
    if (storage) {
      const expiryTime = Date.now() + expiresIn * 1000;
      storage.setItem("tokenExpiry", expiryTime.toString());
    }
  }

  getTokenExpiry(): number | null {
    if (typeof window === "undefined") return null;
    const expiry =
      sessionStorage.getItem("tokenExpiry") ||
      localStorage.getItem("tokenExpiry");
    return expiry ? parseInt(expiry) : null;
  }

  isTokenExpired(): boolean {
    const expiry = this.getTokenExpiry();
    if (!expiry) return true;
    return Date.now() >= expiry;
  }

  clear() {
    if (typeof window === "undefined") return;

    // Clear from both storages
    ["accessToken", "refreshToken", "user", "tokenExpiry"].forEach((key) => {
      sessionStorage.removeItem(key);
      localStorage.removeItem(key);
    });
  }
}

export const tokenStorage = TokenStorage.getInstance();

class ApiClient {
  private refreshTokenPromise: Promise<AuthResponse> | null = null;

  private getAuthHeader(): HeadersInit {
    const token = tokenStorage.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async handleTokenRefresh(): Promise<string | null> {
    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) {
      return null;
    }

    try {
      // If a refresh is already in progress, wait for it
      if (this.refreshTokenPromise) {
        const response = await this.refreshTokenPromise;
        return response.accessToken;
      }

      // Start new refresh
      this.refreshTokenPromise = this.refreshTokenInternal(refreshToken);
      const response = await this.refreshTokenPromise;

      // Store new tokens
      tokenStorage.setAccessToken(response.accessToken);
      tokenStorage.setRefreshToken(response.refreshToken);
      tokenStorage.setTokenExpiry(response.expiresIn);
      tokenStorage.setUser(response.user);

      this.refreshTokenPromise = null;
      return response.accessToken;
    } catch (error) {
      this.refreshTokenPromise = null;
      tokenStorage.clear();
      throw error;
    }
  }

  async request<T>(
    url: string,
    options: RequestInit = {},
    retry = true
  ): Promise<T> {
    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...this.getAuthHeader(),
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Handle 401 - Unauthorized (token expired)
      if (response.status === 401 && retry) {
        const newToken = await this.handleTokenRefresh();

        if (newToken) {
          // Retry request with new token
          const newHeaders = {
            ...config.headers,
            Authorization: `Bearer ${newToken}`,
          };

          return this.request<T>(
            url,
            { ...options, headers: newHeaders },
            false
          );
        }
      }

      // Handle non-2xx responses
      if (!response.ok) {
        let data;
        try {
          data = await response.json();
        } catch (jsonError) {
          // If response body is not valid JSON, create a generic error
          throw {
            status: response.status,
            error: response.statusText || "Error",
            message: "An error occurred. Please try again.",
            path: url,
            timestamp: new Date().toISOString(),
          } as ApiError;
        }
        throw data as ApiError;
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof Error && error.message === "Failed to fetch") {
        throw {
          status: 0,
          error: "Network Error",
          message: "Unable to connect to server. Please check your connection.",
          path: url,
          timestamp: new Date().toISOString(),
        } as ApiError;
      }
      throw error;
    }
  }

  // Auth APIs
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    // Store tokens and user data
    tokenStorage.setAccessToken(response.accessToken);
    tokenStorage.setRefreshToken(response.refreshToken);
    tokenStorage.setTokenExpiry(response.expiresIn);
    tokenStorage.setUser(response.user);

    return response;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    // Set storage preference based on rememberMe
    tokenStorage.setRememberMe(data.rememberMe || false);

    const response = await this.request<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    // Store tokens and user data
    tokenStorage.setAccessToken(response.accessToken);
    tokenStorage.setRefreshToken(response.refreshToken);
    tokenStorage.setTokenExpiry(response.expiresIn);
    tokenStorage.setUser(response.user);

    return response;
  }

  async logout(): Promise<{ message: string }> {
    const refreshToken = tokenStorage.getRefreshToken();

    try {
      if (refreshToken) {
        await this.request(API_ENDPOINTS.AUTH.LOGOUT, {
          method: "POST",
          body: JSON.stringify({ refreshToken }),
        });
      }
    } finally {
      // Clear tokens regardless of API call success
      tokenStorage.clear();
    }

    return { message: "Logged out successfully" };
  }

  private async refreshTokenInternal(
    refreshToken: string
  ): Promise<AuthResponse> {
    const response = await fetch(API_ENDPOINTS.AUTH.REFRESH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw error as ApiError;
    }

    return response.json();
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return this.refreshTokenInternal(refreshToken);
  }

  async getCurrentUser(): Promise<TokenValidationResponse> {
    return this.request<TokenValidationResponse>(API_ENDPOINTS.AUTH.ME);
  }

  async validateToken(token: string): Promise<TokenValidationResponse> {
    return this.request<TokenValidationResponse>(API_ENDPOINTS.AUTH.VALIDATE, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async checkHealth(): Promise<{ message: string }> {
    return this.request<{ message: string }>(API_ENDPOINTS.AUTH.HEALTH);
  }

  async forgotPassword(
    data: ForgotPasswordRequest
  ): Promise<{ message: string }> {
    return this.request<{ message: string }>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  async resetPassword(
    data: ResetPasswordRequest
  ): Promise<{ message: string }> {
    return this.request<{ message: string }>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  async checkUsernameAvailability(username: string): Promise<boolean> {
    try {
      await this.request<{ message: string }>(
        `${API_ENDPOINTS.AUTH.CHECK_USERNAME}?username=${encodeURIComponent(
          username
        )}`,
        { method: "GET" }
      );
      return true; // Username is available
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.status === 409) {
        return false; // Username is taken
      }
      throw error;
    }
  }

  // Mock Interviews API methods
  async createMockInterview(
    data: MockInterviewRequest
  ): Promise<MockInterviewResponse> {
    return this.request<MockInterviewResponse>(
      API_ENDPOINTS.MOCK_INTERVIEWS.CREATE,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  async getMockInterviews(): Promise<MockInterviewResponse[]> {
    return this.request<MockInterviewResponse[]>(
      API_ENDPOINTS.MOCK_INTERVIEWS.LIST
    );
  }

  async getMockInterviewsPaginated(
    page: number = 0,
    size: number = 10,
    sortBy: string = "createdAt",
    sortDir: string = "DESC"
  ): Promise<MockInterviewPage> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sortBy,
      sortDir,
    });
    return this.request<MockInterviewPage>(
      `${API_ENDPOINTS.MOCK_INTERVIEWS.PAGINATED}?${params}`
    );
  }

  async getMockInterviewById(id: number): Promise<MockInterviewResponse> {
    return this.request<MockInterviewResponse>(
      API_ENDPOINTS.MOCK_INTERVIEWS.BY_ID(id)
    );
  }

  async deleteMockInterview(
    id: number
  ): Promise<{ message: string; success: boolean }> {
    return this.request<{ message: string; success: boolean }>(
      API_ENDPOINTS.MOCK_INTERVIEWS.DELETE(id),
      {
        method: "DELETE",
      }
    );
  }

  async getMockInterviewCount(): Promise<number> {
    return this.request<number>(API_ENDPOINTS.MOCK_INTERVIEWS.COUNT);
  }
}

export const apiClient = new ApiClient();
