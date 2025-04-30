nextcmsfe/e
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
├── auth/                     # Auth domain
│   ├── components/
│   ├── features/
│   │   ├── login/
│   │   ├── register/
│   │   └── user/
│   └── lib/                  # Auth-specific utilities and logic
│       ├── hooks/            # Custom hooks for auth
│       ├── helpers/          # Helper functions (e.g., validation)
│       └── context/          # Context for auth state management
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
├── shared/                   # Shared code
│   ├── components/
│   ├── hooks/
│   ├── styles/
│   └── utils/
│
|
├── .eslintrc.json
├── .gitignore
├── components.json
└── next-env.d.ts