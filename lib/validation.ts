export interface PasswordRequirement {
  label: string;
  met: boolean;
}

export interface PasswordValidation {
  isValid: boolean;
  requirements: PasswordRequirement[];
}

export function validatePassword(password: string): PasswordValidation {
  const requirements: PasswordRequirement[] = [
    {
      label: "Uppercase letter",
      met: /[A-Z]/.test(password),
    },
    {
      label: "Lowercase letter",
      met: /[a-z]/.test(password),
    },
    {
      label: "Number",
      met: /\d/.test(password),
    },
    {
      label: "Special character (e.g. !?<>@#$%)",
      met: /[@$!%*?&]/.test(password),
    },
    {
      label: "8 characters or more",
      met: password.length >= 8,
    },
  ];

  const isValid = requirements.every((req) => req.met);

  return { isValid, requirements };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function validateUsername(username: string): {
  isValid: boolean;
  message?: string;
} {
  if (username.length < 3) {
    return {
      isValid: false,
      message: "Username must be at least 3 characters",
    };
  }
  if (username.length > 50) {
    return {
      isValid: false,
      message: "Username must not exceed 50 characters",
    };
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return {
      isValid: false,
      message:
        "Username can only contain letters, numbers, underscores, and hyphens",
    };
  }
  return { isValid: true };
}
