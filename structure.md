nextcmsfe/
│
├── app/                      # Next.js app directory (App Router)
│   ├── (auth)/               # Auth-related route group
│   │   ├── login/            # Login page route
│   │   └── register/         # Register page route
│   ├── (cms)/admin/          # CMS admin route
│   ├── [slug]/               # Dynamic route
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── shared/                   # Shared domain
│   ├── components/
│   ├── features/
│   │   ├── login/
│   │   ├── register/
│   │   └── user/
│   └── lib/                  # Shared hooks, logic and styling
│       ├── hooks/            # Auth-related hooks
│       ├── helpers/          # Helper functions (e.g., validation)
│       └── context/          # UI components
│
├── cms/                      # CMS domain
│   ├── components/
│   ├── features/
│   │   ├── block/
│   │   ├── element/
│   │   └── page/
│   └── lib/                  # CMS-specific utilities and logic
│       ├── hooks/            # Custom hooks for CMS
│       ├── helpers/          # Helper functions for CMS
│       └── context/          # Context for CMS state management
│
├── middleware.ts
├── .eslintrc.json
├── .gitignore
├── components.json
└── next-env.d.ts