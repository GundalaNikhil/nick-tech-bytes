"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  apiClient,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  tokenStorage,
  ApiError,
} from "@/lib/api-client";

interface User {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  role: string;
  emailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (data: ForgotPasswordRequest) => Promise<void>;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = tokenStorage.getUser();
        const accessToken = tokenStorage.getAccessToken();

        if (storedUser && accessToken) {
          // Check if token is expired
          if (tokenStorage.isTokenExpired()) {
            const refreshToken = tokenStorage.getRefreshToken();
            
            if (refreshToken) {
              try {
                // Try to refresh the token
                const response = await apiClient.refreshToken(refreshToken);
                tokenStorage.setAccessToken(response.accessToken);
                tokenStorage.setRefreshToken(response.refreshToken);
                tokenStorage.setTokenExpiry(response.expiresIn);
                tokenStorage.setUser(response.user);
                setUser(response.user);
              } catch (err) {
                // Refresh failed, clear everything
                tokenStorage.clear();
                setUser(null);
              }
            } else {
              tokenStorage.clear();
              setUser(null);
            }
          } else {
            // Token is still valid
            setUser(storedUser);
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        tokenStorage.clear();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Auto-refresh token before expiry
  useEffect(() => {
    if (!user) return;

    const checkTokenExpiry = () => {
      const expiry = tokenStorage.getTokenExpiry();
      if (!expiry) return;

      const timeUntilExpiry = expiry - Date.now();
      const refreshThreshold = 5 * 60 * 1000; // 5 minutes before expiry

      if (timeUntilExpiry <= refreshThreshold && timeUntilExpiry > 0) {
        const refreshToken = tokenStorage.getRefreshToken();
        if (refreshToken) {
          apiClient.refreshToken(refreshToken)
            .then(response => {
              tokenStorage.setAccessToken(response.accessToken);
              tokenStorage.setRefreshToken(response.refreshToken);
              tokenStorage.setTokenExpiry(response.expiresIn);
              tokenStorage.setUser(response.user);
              setUser(response.user);
            })
            .catch(err => {
              console.error("Token refresh error:", err);
              logout();
            });
        }
      }
    };

    // Check every minute
    const interval = setInterval(checkTokenExpiry, 60 * 1000);
    
    // Check immediately
    checkTokenExpiry();

    return () => clearInterval(interval);
  }, [user]);

  const login = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiClient.login(data);
      setUser(response.user);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Login failed. Please try again.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiClient.register(data);
      setUser(response.user);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Registration failed. Please try again.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await apiClient.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  const forgotPassword = async (data: ForgotPasswordRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await apiClient.forgotPassword(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to send reset email. Please try again.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data: ResetPasswordRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await apiClient.resetPassword(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to reset password. Please try again.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await apiClient.getCurrentUser();
      if (response.valid && response.userId) {
        const updatedUser: User = {
          id: response.userId,
          email: response.email || "",
          username: response.username || "",
          role: response.role || "USER",
          emailVerified: false,
        };
        setUser(updatedUser);
        tokenStorage.setUser(updatedUser);
      }
    } catch (err) {
      console.error("Failed to refresh user:", err);
      logout();
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        refreshUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
