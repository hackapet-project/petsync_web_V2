/**
 * Environment Configuration
 *
 * Handles API URL resolution in a portable, environment-agnostic way.
 * Supports multiple deployment scenarios:
 * - Development: localhost with configurable port
 * - Production: relative API path (deployed with backend)
 * - Custom: Override via window.__env object (injected at runtime)
 */

export interface EnvironmentConfig {
  apiUrl: string;
  production: boolean;
}

/**
 * Runtime environment configuration injected via window.__env
 * This allows configuration to be set at deployment time without rebuilding
 */
declare global {
  interface Window {
    __env?: {
      apiUrl?: string;
      production?: boolean;
    };
  }
}

/**
 * Detects the appropriate API URL based on current environment
 */
function detectApiUrl(): string {
  // Priority 1: Runtime configuration (highest priority)
  if (window.__env?.apiUrl) {
    return window.__env.apiUrl;
  }

  // Priority 2: Check if running in production mode (HTTPS on non-localhost)
  const isProduction = window.location.protocol === 'https:' &&
                      window.location.hostname !== 'localhost' &&
                      window.location.hostname !== '127.0.0.1';

  if (isProduction) {
    // Use relative path - assumes frontend and backend on same domain
    return '/api';
  }

  // Priority 3: Development mode - use localhost backend
  let devPort = '9001';
  const apiUrl = window.__env?.apiUrl;
  if (apiUrl && (apiUrl.startsWith('http://') || apiUrl.startsWith('https://'))) {
    const match = apiUrl.match(/:(\d+)/);
    if (match) {
      devPort = match[1];
    }
  }
  return `http://localhost:${devPort}/api`;
}

/**
 * Detects if running in production mode
 */
function isProduction(): boolean {
  if (typeof window.__env?.production !== 'undefined') {
    return window.__env.production;
  }

  return window.location.protocol === 'https:' &&
         window.location.hostname !== 'localhost' &&
         window.location.hostname !== '127.0.0.1';
}

/**
 * Environment configuration object
 * Lazily evaluated to ensure window object is available
 */
export const environment: EnvironmentConfig = {
  get apiUrl(): string {
    return detectApiUrl();
  },
  get production(): boolean {
    return isProduction();
  }
};

/**
 * Helper to check if API URL is configured correctly
 */
export function validateEnvironment(): { valid: boolean; message: string } {
  const apiUrl = environment.apiUrl;

  if (!apiUrl) {
    return {
      valid: false,
      message: 'API URL is not configured'
    };
  }

  // Check if URL is properly formed
  if (apiUrl.startsWith('http')) {
    try {
      new URL(apiUrl);
    } catch {
      return {
        valid: false,
        message: `Invalid API URL format: ${apiUrl}`
      };
    }
  }

  return {
    valid: true,
    message: `API URL configured: ${apiUrl}`
  };
}