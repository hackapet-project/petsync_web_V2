/**
 * Runtime Environment Configuration Template
 *
 * This file provides runtime configuration that can be modified during deployment
 * without rebuilding the application.
 *
 * USAGE:
 * 1. Copy this file to env.js in the same directory
 * 2. Update the configuration values for your environment
 * 3. The env.js file will be loaded before the application starts
 *
 * DEPLOYMENT:
 * - Development: Uses default localhost:9001
 * - Production: Configure apiUrl to point to your backend
 * - Docker: Mount env.js as a volume or inject via build args
 * - Coolify/Cloud: Use environment variables to generate env.js at startup
 */

(function(window) {
  window.__env = window.__env || {};

  // API Configuration
  // Examples:
  // - Same domain: '/api'
  // - Different domain: 'https://api.example.com/api'
  // - Development: 'http://localhost:9001/api'
  window.__env.apiUrl = '/api';

  // Environment flag
  window.__env.production = true;

  // Add other runtime configuration here as needed
  // window.__env.featureFlags = { ... };
  // window.__env.analytics = { ... };
}(this));