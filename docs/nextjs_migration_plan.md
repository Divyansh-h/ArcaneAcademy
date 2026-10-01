# Next.js App Router Migration Plan

Migrating ArcaneAcademy from Vite (Client-Side Rendering) to Next.js (App Router, Server-Side Rendering) is a major architectural shift. To ensure zero downtime and maintain feature parity, we will use an **incremental migration strategy**.

---

## 1. Architecture Mapping (What Maps to What?)

### Routing
| React Router (Vite) | Next.js App Router |
| :--- | :--- |
| `<Route path="/dashboard" />` | `app/dashboard/page.tsx` |
| `<Route path="/courses/:id" />` | `app/courses/[id]/page.tsx` |
| `<Route path="*" />` | `app/not-found.tsx` |
| `react-router-dom` `<Link>` | `next/link` `<Link>` |
| `useNavigate()` | `useRouter()` from `next/navigation` |

### Layouts & UI Shells
| React (Vite) | Next.js App Router |
| :--- | :--- |
| `<Outlet />` wrapper components | `layout.tsx` (receives `{ children }`) |
| Global `App.tsx` shell | `app/layout.tsx` (Root Layout) |
| Dashboard wrapper shell | `app/dashboard/layout.tsx` (Nested Layout) |

### State & Data Fetching
| React (Vite) | Next.js App Router |
| :--- | :--- |
| `useEffect(() => fetch(...))` | **Server Components**: `const data = await fetch(...)` directly in the component body. |
| Global Context (`AuthContext`) | Requires `"use client"` at the top of the provider file, then imported into `app/layout.tsx`. |
| Interactivity (`useState`, `onClick`) | Add `"use client"` directive to the top of the specific interactive component file. |

---

## 2. Step-by-Step Incremental Migration

We will keep both the Vite app and Next.js app running locally simultaneously until the migration is 100% complete.

### Step 1: Scaffolding & Setup
1. Run `npx create-next-app@latest arcane-next` adjacent to the current frontend folder.
2. Select **App Router**, **TypeScript**, and **Tailwind CSS** (or standard CSS modules if preferred).
3. Copy over all static assets (`public/` images, fonts).
4. Migrate global CSS files and design tokens to `app/globals.css`.

### Step 2: Global Providers & Root Layout
1. Create a `Providers.tsx` file containing your Context API providers (Auth, Theme, Redux, etc.). 
2. Add the `"use client"` directive to the very top of `Providers.tsx` (Context relies on React state).
3. Import `Providers.tsx` into `app/layout.tsx` and wrap the `{children}`.
   ```tsx
   // app/layout.tsx
   import { Providers } from './Providers';
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <Providers>{children}</Providers>
         </body>
       </html>
     );
   }
   ```

### Step 3: Leaf Nodes & Static Pages (Bottom-Up)
1. Start by migrating pages that have no sub-routes and minimal data fetching (e.g., Landing Page, About, Login).
2. For pages requiring interactivity (forms, buttons), immediately slap `"use client"` at the top of the file.
3. Verify these pages render perfectly in Next.js.

### Step 4: Refactoring Data Fetching (Server Components)
1. Migrate the `Dashboard` and `Courses` pages.
2. **Crucial Change**: Instead of using `useEffect` to fetch data, convert the page to an `async` function and fetch the data on the server.
   ```tsx
   // app/courses/page.tsx
   // This executes entirely on the Node.js server!
   export default async function CoursesPage() {
     const res = await fetch('http://api-gateway/courses');
     const courses = await res.json();
     
     return <CourseList courses={courses} />;
   }
   ```

### Step 5: Routing Translation
1. Search your entire codebase for `react-router-dom`.
2. Replace all instances of `<Link to="/path">` with Next.js `<Link href="/path">`.
3. Replace all programmatic navigation (`useNavigate`) with Next.js `useRouter` from `next/navigation`.

### Step 6: Cutover & Sunsetting Vite
1. Run `npm run build` on the Next.js project to ensure SSR compilation passes.
2. Update your deployment environment (Vercel/AWS) to point to the new Next.js project root.
3. Monitor for 404s or hydration errors.
4. Once stable, safely delete the old Vite folder.
