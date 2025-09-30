/**
 * Example Runtime Configuration for Local Development
 *
 * This demonstrates how to override API URL for local development
 * when working with a backend on a different port or domain.
 *
 * USAGE: Copy to env.js and customize
 */

(function(window) {
  window.__env = window.__env || {};

  // Example: Connect to backend on different port
  window.__env.apiUrl = 'http://localhost:8000/api';

  window.__env.production = false;
}(this));