# UnifiedAssist Customer Support Dashboard

UnifiedAssist is a modern, AI-powered customer support dashboard built with Next.js. It provides a unified inbox for managing customer tickets, viewing customer profiles, and gaining insights from reports.

## Tech Stack

This project is built with a modern tech stack to ensure a high-quality, scalable, and maintainable application.

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI**: [Genkit](https://firebase.google.com/docs/genkit)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **State Management**: React Hooks & Context API

## Project Structure

The project is organized following Next.js best practices, with a focus on modularity and clarity.

```
src
├── ai/                # Genkit AI flows and configuration
│   ├── flows/
│   └── genkit.ts
├── app/               # Next.js App Router: pages and layouts
│   ├── (pages)/
│   └── layout.tsx
├── components/        # Reusable React components
│   ├── layout/
│   ├── ui/            # ShadCN UI components
│   └── ...
├── hooks/             # Custom React hooks
├── lib/               # Utility functions, data, and type definitions
└── ...
```

- `src/app`: Contains all the routes, pages, and layouts for the application.
- `src/components`: Houses all the React components, organized by feature.
- `src/lib`: Includes shared utilities, mock data (`data.ts`), and TypeScript types (`types.ts`).
- `src/ai`: Contains the Genkit configuration and AI-powered flows.

## Getting Started

To get the project up and running on your local machine, follow these steps.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or a compatible package manager

### Installation

1.  **Clone the repository** (if applicable) or ensure you have the project files.
2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running the Development Server

To start the local development server:

```bash
npm run dev
```

This will start the Next.js application on `http://localhost:9002` by default. The Genkit AI services will also be running in development mode.

## Available Scripts

- `npm run dev`: Starts the application in development mode with hot-reloading.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase using Next.js's built-in ESLint configuration.

## Key Features

- **Ticket Management**: A central inbox to view, manage, and respond to customer support tickets.
- **Customer Profiles**: View detailed customer information, including interaction history and internal notes.
- **AI-Powered Search**: Use natural language to search for tickets and customer profiles.
- **Reporting**: A dashboard with charts to visualize ticket volume and agent workload.
- **Settings**: A dedicated page for application configuration.

## Contribution Guidelines

To maintain code quality and consistency, please follow these guidelines when contributing.

### Code Style

- Follow the existing code style.
- Use functional components with React Hooks.
- Write clear, commented, and self-documenting code where necessary.
- Ensure components are reusable and well-defined.

### UI and Styling

- **Component Library**: Prefer using [ShadCN UI](https://ui.shadcn.com/) components whenever possible.
- **Styling**: Use [Tailwind CSS](https://tailwindcss.com/) utility classes for all styling. Do not write custom CSS files unless absolutely necessary.
- **Responsiveness**: Ensure all new UI is responsive and works well on all screen sizes.

### AI Features with Genkit

- All AI-related functionality is managed through Genkit.

- New AI capabilities should be implemented as Genkit "flows" within the src/ai/flows directory.

- Define clear input and output schemas for each flow using Zod.

## Licenses and Rules

This project is licensed under the MIT License (see below).

Contributors must agree to license their code under the same license.

Do not commit sensitive information such as API keys, secrets, or credentials. Use .env.local for environment variables.

Follow the Conventional Commits standard for commit messages (e.g., feat:, fix:, docs:, refactor:).

All pull requests must be reviewed by at least one maintainer before merging.

Respect community guidelines: be collaborative, constructive, and professional.

```sql
MIT License

Copyright (c) 2025 UnifiedAssist

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

```