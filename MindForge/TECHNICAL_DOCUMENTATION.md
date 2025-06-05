# MindForge

A modern web platform for connecting employers with specialists.

## Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS with Shadcn/UI
- **State Management**: Redux Toolkit
- **Language**: TypeScript

## Project Structure

```
mindforge/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout component
│   │   ├── page.tsx                  # Home page
│   │   └── employer/                 # Employer routes
│   │       ├── catalog/              # Catalog page for employers
│   │       ├── home/                 # Employer home page
│   │       ├── my-profile/           # Employer profile management
│   │       └── specialist-profile/   # Specialist profile view
│   ├── components/                   # Reusable components
│   │   ├── ui/                       # UI components from Shadcn/UI
│   │   ├── layout/                   # Layout components (Header, Footer, etc.)
│   │   ├── cards/                    # Card components
│   │   └── inputs/                   # Input components
│   ├── lib/                          # Utility libraries
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── utils/                    # Utility functions
│   │   └── api/                      # API client functions
│   ├── styles/                       # Global styles and theme
│   └── types/                        # TypeScript type definitions
├── public/                           # Static assets
├── components.json                   # Shadcn UI configuration
└── next.config.js                    # Next.js configuration
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make sure Tailwind CSS dependencies are properly installed:
   ```bash
   npm install -D tailwindcss@latest postcss autoprefixer
   ```
4. Install required UI dependencies:
   ```bash
   npm install class-variance-authority clsx tailwind-merge
   ```
5. Install Redux dependencies:
   ```bash
   npm install @reduxjs/toolkit react-redux
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Migration Notes

This project is a migration from a React/Vite/CSS Modules application to Next.js with Tailwind CSS and Shadcn/UI components.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
