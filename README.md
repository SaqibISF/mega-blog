# Mega Blog

This project is a modern web application built using **Appwrite**, **React**, **Redux Toolkit**, **React Hook Form**, **Tailwind CSS**, **DaisyUI**, and **TinyMCE** to provide an efficient and user-friendly platform. It integrates backend services through Appwrite, handles user authentication, and allows for content management such as post creation and updates. The app is designed to be scalable and maintainable with a well-organized folder structure and clear separation of concerns.

## 0 - Getting Started

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

## 1 - Folder Structure Overview

The project follows a modular and organized structure to maintain scalability and clarity:

- `/src` - The main source folder containing all project files.
  - `/app` - Contains application-specific logic and routes.
  - `/appwrite` - Contains classes and services for Appwrite backend interaction (e.g., authentication, database, storage).
  - `/components` - Contains reusable components used across the application.
  - `/components/elements` - Contains smaller, reusable UI elements (e.g., TextInput, Button, FileInput).
  - `/fonts` - Stores font files used in the application.
  - `/hooks` - Custom hooks for interacting with Redux and other logic (e.g., useAuthState, usePostsState).
  - `/icons` - Contains icons used in various components.
  - `/store` - Contains Redux-related files, including slices and the Redux store setup.
  - `/types` - Contains TypeScript types and interfaces for better type safety.
  - `/validations` - Contains validation logic for forms (e.g., login, signup, and post-related validations).
  - `config.ts` - Contains configuration settings, including environment variables.
  - `pathNames.ts` - Centralized file for managing and defining all route paths.

## 2 - App Routing

- App routing is implemented using **Next.js** with dynamic routing for efficient navigation.
- Routes are defined in a separate file, **pathNames.ts**, for cleaner management and to avoid hardcoded strings in components.
- **Authentication Routing**: Pages like Login and Signup have conditional routing logic to prevent access when a user is already logged in.
- **Protected Routes**: Certain pages require authentication. If a user is not logged in, they are redirected to the login page.

## 3 - Appwrite Integration

Appwrite is used for backend services, and the integration is organized into separate service files for better maintainability and clarity.

- **AuthService** (`auth.ts`): Contains asynchronous methods for user authentication:
  - `createAccount`: Registers a new user.
  - `login`: Logs in an existing user.
  - `getCurrentUser`: Retrieves the currently authenticated user.
  - `logout`: Logs out the user.

- **DatabaseService** (`database.ts`): Handles CRUD operations for posts with Appwrite's database:
  - `createPost`: Creates a new post.
  - `updatePost`: Updates an existing post.
  - `deletePost`: Deletes a post.
  - `getPost`: Fetches a specific post.
  - `getPosts`: Retrieves multiple posts.

- **StorageService** (`storage.ts`): Handles file uploads and retrieval:
  - `uploadFile`: Uploads a file to Appwrite's storage.
  - `deleteFile`: Deletes a file from Appwrite's storage.
  - `getFilePreview`: Retrieves a preview of a file from storage.

## 4 - Component Structure

UI components are built using **DaisyUI** and **Tailwind CSS**, focusing on reusable and modular components.

- **Reusable Components**:
  - `TextInput`, `Button`, `FileInput`, `Select`, `Loading`: Basic UI components.
  - `PostCard` and `PostCardSkeleton`: Display posts and loading states.
  - `RTE.tsx`: Rich text editor component for **TinyMCE**.
  - `ThemeSwitcher.tsx`: Allows toggling between dark and light themes.

- **AuthLayout.tsx**: Protects pages that require authentication, ensuring the user is logged in before rendering.
- **Footer.tsx**: Contains the footer element for all pages.

## 5 - Custom Hooks

Custom hooks are defined for handling Redux state in a modular manner.

- **useAuthState.ts**: Provides hooks like `useUserData`, `useAuthStatus`, and `useSyncAuthStatus` for managing user authentication state.
- **usePostsState.ts**: Provides hooks like `usePost` and `usePosts` for managing post data in the Redux store.

## 6 - html-react-parser

- **html-react-parser** is used to safely render HTML content within React components.
- It enables you to inject and render raw HTML inside your app while preserving its structure.

## 7 - React Hook Form

- **React Hook Form** is used for handling form validation and state management in the app.
- The library simplifies form handling, reduces re-renders, and easily integrates with third-party libraries.
- It also helps with complex form validations, making form submissions easier to manage.

## 8 - Redux Toolkit for State Management

- **Redux Toolkit** is used for managing global application state, with slices defined for authentication and posts.
- `authSlice.ts`: Manages user authentication state.
- `postsSlice.ts`: Manages post-related data.
- The global store is configured using `configureStore` from Redux Toolkit, combining both the auth and posts reducers.

## 9 - AuthLayout.tsx - Authentication and Authorization Layout

**AuthLayout.tsx** manages and protects routes that require authentication. It is used to wrap pages/components that require the user to be logged in.

- **Authentication Check**: Ensures that pages requiring authentication (authentication = true) are only accessible by logged-in users (authStatus = true).
- **Conditional Rendering**: Pages are rendered based on authentication status.
- **Redirection**: Redirects users to appropriate pages (Login or Home) based on their authentication status.
- **Flexibility**: AuthLayout centralizes authentication checks, streamlining the routing for protected pages.

## 10 - Types

Types are stored in the `/types` folder to ensure better type safety and manage state.

- **AuthState.ts**: Defines types like `UserData` and `AuthState`.
- **AuthUser.ts**: Defines types like `LoginData` and `SignupData`.
- **PostsState.ts**: Defines types like `Post` and `PostsState`.

## 11 - Validations Using React Hook Form

**React Hook Form** is used for handling validation in the app’s forms (login, signup, create/update post).

- The validation logic is stored in the `/validations` folder:
  - **authValidations.ts**: Contains validation rules for login and signup forms (e.g., name, email, and password).
  - **postValidations.ts**: Contains validation rules for creating and updating posts (e.g., title and slug).

These validations ensure that user inputs meet certain requirements, such as pattern matching and length constraints, providing user-friendly feedback and maintaining data integrity.

## 12 - Config.ts for Environment Variables

The **config.ts** file is used to manage and expose environment variables to the application.

- Centralizes environment-specific settings like:
  - **Appwrite** endpoint, project ID, API key, etc.
  - **TinyMCE** API key.

## 13 - Routing and Path Management

- Routes are defined in **pathNames.ts**, centralizing and organizing the routes across the application.

## 14 - Environment Configuration

The `.env` file contains important environment variables for various services like **Appwrite** and **TinyMCE**.

- **Important Variables**:
  - `NEXT_PUBLIC_APPWRITE_URL=[your-appwrite-endpoint]`
  - `NEXT_PUBLIC_APPWRITE_PROJECT_ID=[your-appwrite-project-id]`
  - `NEXT_PUBLIC_APPWRITE_DATABASE_ID=[your-appwrite-database-id]`
  - `NEXT_PUBLIC_APPWRITE_COLLECTION_ID=[your-appwrite-collection-id]`
  - `NEXT_PUBLIC_APPWRITE_BUCKET_ID=[your-appwrite-bucket-id]`
  - `NEXT_PUBLIC_APPWRITE_API_KEY=[your-appwrite-api-key]`
  - `NEXT_PUBLIC_TINY_MCE_API_KEY=[your-tiny-mce-api-key]`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
