/**
 * User model - matches backend User model
 */
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  role?: 'admin' | 'staff' | 'volunteer';
}

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Login response with authentication token
 */
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn: number; // seconds
}

/**
 * Register request payload
 */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * Register response
 */
export interface RegisterResponse {
  user: User;
  message: string;
}

/**
 * Forgot password request
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Forgot password response
 */
export interface ForgotPasswordResponse {
  message: string;
  emailSent: boolean;
}