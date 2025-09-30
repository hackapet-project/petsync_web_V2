# PetSync Frontend

Angular 20.1 application for animal shelter management platform.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
# Opens at http://localhost:4200

# Run linter
npm run lint

# Run tests
npm test
```

## Project Structure

```
src/
├── app/
│   ├── core/                    # Core services, interceptors, models
│   │   ├── interceptors/        # HTTP interceptors (API, auth)
│   │   ├── models/              # TypeScript interfaces
│   │   ├── services/            # Singleton services
│   │   └── validators/          # Custom form validators
│   ├── pages/                   # Page components
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   └── shared/                  # Shared components, directives
└── environments/                # Not used - API URL auto-detected
```

## Key Features

### 🔐 Authentication Pages
- **Login**: Email/password with Google OAuth placeholder
- **Register**: Secure registration with password strength validation
- **Forgot Password**: Email-based password recovery

### 🌐 API Configuration
The application uses a robust, portable API configuration system that works across all deployment environments without hardcoded domains.

**Automatic Detection:**
- **Production** (HTTPS): Uses `/api` relative path (same domain as frontend)
- **Development** (localhost): Uses `http://localhost:9001/api`

**Runtime Override:**
For custom deployments, create `public/env.js` to override configuration:
```javascript
(function(window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = 'https://api.example.com/api';
  window.__env.production = true;
}(this));
```

**Template Available:** Copy `public/env.template.js` to `public/env.js` and customize.

**Implementation:**
- Configuration: `src/app/core/config/environment.config.ts`
- Interceptor: `src/app/core/interceptors/api-interceptor.ts`

### 📝 Form Validation
All forms use reactive forms with custom validators:
- Email format validation
- Password strength (8+ chars, uppercase, lowercase, numbers)
- No whitespace validation
- Password matching validation

### 🎨 Responsive Design
- Mobile-first approach
- Desktop: Two-panel layout with branding
- Mobile/Tablet (<768px): Single-panel centered design

## Development Guidelines

### Component Naming
- Components must end with `Component`: `LoginComponent`, `RegisterComponent`
- Use Angular CLI to generate: `ng generate component feature/name`

### State Management
- Use Angular signals for reactive state
- Read-only signals exposed via `asReadonly()`
- Example: `private userSignal = signal<User | null>(null)`

### Form Validation
```typescript
// Use custom validators from core/validators
this.form = this.fb.group({
  email: ['', [Validators.required, CustomValidators.emailFormat()]],
  password: ['', [Validators.required, Validators.minLength(8)]]
});
```

### API Calls
HTTP interceptor automatically:
- Adds base URL to requests
- Handles errors with user-friendly messages
- Logs errors in development mode

## TypeScript Interfaces

All API contracts are defined in `src/app/core/models/`:
- `User`, `LoginRequest`, `RegisterRequest`
- `ApiResponse<T>`, `PaginatedResponse<T>`
- Import via `import { User } from '@core/models'`

## Code Quality

```bash
# Lint code
npm run lint

# Auto-fix linting issues
npm run lint -- --fix

# Check types
npx tsc --noEmit
```

## Deployment

### Standard Deployment (Coolify, Vercel, Netlify, etc.)
The app auto-detects environment - no configuration needed:
1. Build: `npm run build`
2. Serve from `dist/front/browser/`
3. API URL auto-configured based on protocol (HTTP/HTTPS)

### Custom API URL Deployment
If your API is on a different domain:

1. **Build Time:** Set `window.__env.apiUrl` before application loads
2. **Runtime:** Create `public/env.js` with configuration
3. **Docker:** Mount or copy `env.js` into container

**Example Dockerfile:**
```dockerfile
FROM nginx:alpine
COPY dist/front/browser /usr/share/nginx/html
# Optional: Copy custom env.js
COPY env.js /usr/share/nginx/html/env.js
```

**Example Docker Compose:**
```yaml
services:
  frontend:
    build: .
    volumes:
      - ./env.js:/usr/share/nginx/html/env.js:ro
```

**Example env.js for different domain:**
```javascript
(function(window) {
  window.__env = { apiUrl: 'https://api.example.com/api', production: true };
}(this));
```

### Environment Variables (Not Required)
This project uses runtime configuration instead of build-time environment variables. This means:
- ✅ Single build works for all environments
- ✅ No rebuilding needed when changing API URL
- ✅ Configuration changes at deployment time
- ✅ More portable and flexible

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
