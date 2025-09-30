# 🐾 Hackapet - PetSync

![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg) ![Angular](https://img.shields.io/badge/Angular-20.1-red.svg) ![Django](https://img.shields.io/badge/Django-5.1-green.svg) ![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg) ![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)

**Open-source platform for animal shelter management**

[Quick Start](#quick-start) • [Documentation](#documentation) • [Development](#development-setup) • [Contributing](#contributing)

---

## Overview

Hackapet is a comprehensive, open-source web platform designed specifically for animal shelter management. Built with modern technologies and professional development practices, it provides a secure, scalable, and user-friendly solution for shelter operations.

Born from direct collaboration with rescue organizations like **SOS Peludetes**, the platform addresses real operational challenges faced by shelters that typically rely on paper records, spreadsheets, and messaging apps.

**PetSync** is one of the flagship products: a full-stack animal shelter management system designed to streamline operations, improve transparency, and ultimately help save more animals.

## Architecture

- **Frontend**: Angular 20.1 + TypeScript
- **Backend**: Django 5.1 + REST Framework + PostgreSQL
- **Infrastructure**: Docker + Docker Compose
- **Deployment**: Production-ready containerization

## Key Features

### Production Ready

- **Animal Management** - Complete digital profiles with medical history, behavior tracking, and rescue documentation
- **Integrated Calendar** - Veterinary appointments, adoption visits, and event scheduling with automatic notifications
- **Social Media Automation** - Automated posting to multiple platforms when animals become available for adoption
- **Adoption Portal** - Public-facing interface for potential adopters to search and connect with animals
- **Financial Transparency** - Automated tracking and reporting of expenses per animal to build donor trust
- **Medical Records** - Store vaccination schedules, treatment plans, photos of medical documents, and health tracking
- **Flexible Notes System** - Open comment areas alongside structured data fields for comprehensive record-keeping

### Developer Experience

- **One-command setup** - `make up` to start development environment
- **Hot reload** - Instant feedback during development with Angular and Django dev servers
- **Automated testing** - Frontend (Karma/Jasmine) + Backend (Django test framework)
- **Docker containerization** - Consistent development and production environments
- **API versioning** - Structured API design for stability and backward compatibility

### Security & Quality

- **Environment-based configuration** - No hardcoded secrets, secure development practices
- **PostgreSQL database** - Production-grade database with automated migrations
- **JWT authentication ready** - Secure token-based authentication with djangorestframework-simplejwt
- **ULID-based IDs** - Unique, sortable identifiers for all entities
- **TypeScript strict mode** - Type safety and code quality enforcement

## Quick Start

### Prerequisites

- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop)
- **Node.js 18+** - [Download here](https://nodejs.org/) (for local frontend development)
- **Make** - Usually pre-installed on macOS/Linux

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/hackapet-project/petsync_web_V2.git
cd petsync_web_V2

# 2. Start the development environment
make up

# 3. Apply database migrations
make migrate
```

### Access Points

Once the environment is running:

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:4000 | Angular development server |
| Backend | http://localhost:9001 | Django API server |
| Admin Panel | http://localhost:9001/admin | Django administration |

### Initial Setup

```bash
# Apply database migrations
make migrate

# Create a superuser for admin access
make superuser

# View logs
docker compose logs -f
```

## Development Setup

### Available Commands

```bash
# Local Development (with port mappings)
make up          # Start development environment with ports 4000, 9001, 5432
make down        # Stop all containers
make build       # Build/rebuild containers

# Production Deployment (Coolify auto-allocates ports)
make up-prod     # Start without port mappings (for Coolify/cloud)
make down-prod   # Stop production containers
make build-prod  # Build for production deployment

# Database
make migrations  # Create and apply migrations
make migrate     # Apply migrations only

# Testing
make test_back   # Run backend tests

# Utilities
make create_app i=app_name  # Create new Django app
```

**Note**: The main `docker-compose.yml` uses `expose` instead of `ports` to allow Coolify to automatically allocate ports and avoid conflicts. For local development, we use `docker-compose.local.yml` which adds port mappings.

### Frontend Development

```bash
cd front

# Install dependencies
npm install

# Start dev server
npm start
# or: ng serve

# Run tests
npm test
# or: ng test

# Build for production
npm run build
# or: ng build
```

### Project Structure

```
petsync_web_V2/
├── back/                    # Django backend
│   ├── api/                 # Core API
│   │   ├── models/          # User, Animal, Shelter models
│   │   └── v1/              # API versioning
│   ├── core/                # Django settings and configuration
│   └── manage.py            # Django management
├── front/                   # Angular frontend
│   ├── src/                 # Angular components and logic
│   ├── src/test/            # Frontend test utilities
│   └── angular.json         # Angular CLI configuration
├── docker-compose.yml       # Multi-service orchestration
├── Makefile                 # Development automation
└── README.md                # This file
```

## Documentation

### For Developers

- **API versioning** - Located in `/back/api/v1/`
- **Core models** - User, Animal, Shelter in `/back/api/models/`

### Tech Stack Details

**Backend (Django)**
- Django 5.1.x with Django REST Framework
- Custom User model (`AUTH_USER_MODEL = 'api.User'`)
- Core models: User, Animal, Shelter
- API versioning structure in `/back/api/v1/`
- SQLite database for development, PostgreSQL for production
- ULID for ID generation (python-ulid)
- JWT authentication ready (djangorestframework-simplejwt)

**Frontend (Angular)**
- Angular 20.1.x with standalone components
- TypeScript with strict configuration
- Karma + Jasmine for testing
- Angular CLI for development and build tools
- Mobile-first responsive design

**Infrastructure**
- Docker for containerization
- Docker Compose for orchestration
- Hot reload for both frontend and backend
- Production-ready configuration

## Testing & Quality

### Running Tests

```bash
# Backend tests
make test_back
# or: docker compose run --rm back pytest

# Frontend tests
cd front && npm test
# or: cd front && ng test
```

### Code Quality

The project follows:

- **Backend**: Django best practices, Django REST Framework conventions
- **Frontend**: Angular style guide, TypeScript strict mode
- **Testing**: Comprehensive test coverage for critical features

## Deployment

### Production Configuration

The application is production-ready with optimized Docker configurations:

```bash
# Build production images
make build

# Production environment variables needed:
# - DJANGO_SECRET_KEY (generate new)
# - DATABASE_URL (PostgreSQL connection)
# - DJANGO_ALLOWED_HOSTS (your domain)
# - DJANGO_DEBUG=False
```

### Environment Configuration

Configure your production environment with:

```bash
# Example production configuration
DJANGO_SECRET_KEY=your-super-secure-secret-key
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:password@host:port/database
```

## Roadmap

### Phase 1: Core Features
- [ ] Basic CRUD for animal management (starting with dogs)
- [ ] Event calendar system
- [ ] Social media automation prototype

### Phase 2: Advanced Features
- Complete adoption workflow
- Financial transparency dashboard
- Enhanced social media templates

### Phase 3: Optimization & Expansion
- Multi-species support (cats and other animals)
- Geolocation for rescues
- Performance optimization for multiple shelters
- Donation system integration

## Contributing

We welcome contributions from developers, designers, and animal welfare advocates worldwide!

### Quick Contributing Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Run `make up` to get started
4. Make your changes following our code standards
5. Test with `make test_back` and `npm test`
6. Submit a pull request

### Development Guidelines

- Follow existing code conventions
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PRs
- Use meaningful commit messages

## Mission & Values

**Mission**: Develop accessible and effective technological tools that enable animal shelters to optimize their operations, increase rescue capacity, and improve the living conditions of animals in their care.

**Core Values**:
- **Direct Social Impact**: Every feature must measurably improve animal welfare or shelter efficiency
- **Operational Transparency**: Complete visibility of processes, expenses, and animal status
- **Digital Accessibility**: Intuitive interfaces for users of all technical skill levels
- **Community Collaboration**: Fostering participation from developers, designers, and volunteers

## License

Licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).

This ensures that all modifications and usage in networks (e.g., as a web app) remain open-source. This project is open source to ensure animal shelters worldwide can access these tools regardless of budget constraints.

## Acknowledgments

Special thanks to **SOS Peludetes** and their team (Felipe Gadea, Empar, Pili, Toñi, and Ignacio L. D.) for their invaluable feedback and real-world insights that shaped this platform's development.

## Support & Community

### Getting Help

- **Bug Reports**: [GitHub Issues](https://github.com/hackapet-project/petsync_web_v2/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/hackapet-project/petsync_web_v2/discussions)
- **General Questions**: Open an issue or reach out through project channels

### Troubleshooting

**Docker not starting?**

```bash
# Check if Docker is running
docker --version
docker compose version

# Start Docker Desktop and try again
make up
```

**Environment issues?**

```bash
# Stop containers
make down

# Rebuild and restart
make build
make up
```

**Port conflicts?**

For local development:
- Frontend: http://localhost:4000
- Backend: http://localhost:9001
- Database: localhost:5432

If you see port conflicts locally, stop other services using these ports or modify `docker-compose.local.yml`.

**Coolify Deployment**: No port configuration needed - Coolify automatically allocates ports based on the `expose` directives in `docker-compose.yml`.

---

**Built by the Hackapet Team for animal welfare organizations worldwide**

[Star us on GitHub](https://github.com/hackapet-project/petsync_web_v2) • [Visit hackapet.org](https://hackapet.org)