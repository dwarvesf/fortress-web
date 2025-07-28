# Fortress Web V2

Web dashboard application for managing resources and measuring performance at Dwarves Foundation.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dwarvesf/fortress-web)

## 🚀 Deployment

**Live Site**: [fortress.d.foundation](https://fortress.d.foundation)  
**Vercel Dashboard**: [dwarves-foundation/fortress](https://vercel.com/dwarves-foundation/fortress)

## 📋 Prerequisites

- Node.js 16+
- pnpm (required for package management)

## 🛠️ Development Setup

### Clone Repository

```bash
git clone --depth=1 git@github.com:dwarvesf/fortress-web.git
cd fortress-web
```

### Install Dependencies

```bash
pnpm install --shamefully-hoist
```

### Environment Variables

The application uses the following environment variables (configured in `vercel.json`):

```bash
BASE_URL=https://develop-api.fortress.d.foundation/api/v1
GOOGLE_CLIENT_ID=180094408893-s17eot91hbmqa5lp6gsgjglan9et20sp.apps.googleusercontent.com
PNPM_FLAGS=--shamefully-hoist
```

For local development, create a `.env.local` file with your configuration.

### Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your favorite browser to see your project.

## 🏗️ Build & Deployment

### Local Build

```bash
pnpm build
```

### Vercel Deployment

The application is configured for automatic deployment on Vercel:

- **Build Command**: `next build`
- **Development Command**: `next dev --port $PORT`
- **Output Directory**: Next.js default
- **Install Command**: `pnpm install --shamefully-hoist`

#### Manual Deployment

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

## 🌐 Deployment Environments

| Environment | URL | Platform |
|-------------|-----|----------|
| Production  | [fortress.d.foundation](https://fortress.d.foundation) | Vercel |
| Vercel Preview | [fortress-*.vercel.app](https://vercel.com/dwarves-foundation/fortress) | Vercel |

## 🔗 API References

| Service | URL |
|---------|-----|
| Production API | <https://api.fortress.d.foundation/api/v1> |
| Development API | <https://develop-api.fortress.d.foundation/api/v1> |
| API Documentation | <https://develop-api.fortress.d.foundation/swagger/index.html> |

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in CI mode
pnpm test:ci
```

## 🎨 Code Quality

```bash
# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format
```

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm test:ci` - Run tests in CI mode
- `pnpm lint` - Run ESLint and Stylelint
- `pnpm lint:fix` - Fix linting issues automatically
- `pnpm format` - Format code with Prettier
- `pnpm storybook` - Start Storybook
- `pnpm build:storybook` - Build Storybook
- `pnpm analyze` - Analyze bundle size
- `pnpm fetch-definitions` - Update API type definitions

## Documentation

- [Getting started](./docs/GETTING_STARTED.md)
- [Tech ecosystem](./docs/TECH_ECOSYSTEM.md)
- [Code style](./docs/CODE_STYLE.md)
- [Writing tests](./docs/WRITING_TEST.md)
- [Editor](./docs/EDITOR.md)
- [Deployment](./docs/DEPLOYMENT.md)
