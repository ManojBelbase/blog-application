#  Blog App


## ✨ Core Features

### 🔐 Authentication & Security
- **Secure Onboarding**: Full support for User Registration and Login.
- **Session Persistence**: JWT tokens are securely stored and synced across browser sessions.
- **Protected Routing**: Advanced HOC-based route guards prevent unauthorized access to the dashboard.
- **Auto-Logout**: Integrated API interceptors that automatically handle token expiration and unauthorized access.

### 📝 Blog Management
- **Rich Text Editor**: Powered by React Quill for high-quality content creation with formatting, lists, and headings.
- **Dynamic Dashboard**: A centralized management area to handle all your blog posts efficiently.
- **Optimistic CRUD**: Instant UI updates when creating, editing, or deleting posts for a snappy experience.
- **Category System**: Organizes content into distinct categories like Tech, Lifestyle, and General.

### 🎨 UI & UX Excellence
- **Intelligent Search**: Real-time filtering that lets you find blogs by title instantly as you type.
- **Dual Themes**: Handcrafted Dark and Light modes with manual toggle and persistence via `localStorage`.
- **Premium Aesthetics**: Modern, minimal design using CSS variables and smooth micro-animations.
- **Loading States**: Shimmer effects and skeleton screens for a polished data-loading experience.

## 🛠 Technology Stack

### Frontend Architecture
- **React 19 (Vite)**: Leveraging the latest core features for lightning-fast rendering and modular development.
- **Zustand**: A minimalist, high-performance state management library for global data sync.
- **Tailwind CSS v4**: Utility-first styling integrated with native CSS variables for dynamic runtime theming.
- **Axios**: Centralized HTTP client configured with request/response interceptors for robust API communication.
- **Context API**: Utilized for lightweight, app-wide theme management.
- **Yup & React Hook Form**: Industry-standard form validation and schema enforcement.

### Backend Infrastructure
- **Node.js & Express**: A scalable and fast backend environment for handling RESTful API requests.
- **MongoDB (Mongoose)**: Robust NoSQL database management with structured schemas and indexing.
- **JWT**: Stateless session management using secure JSON Web Tokens.

## 📁 Folder Structure
```text
src/
├── axios/
│   └── axiosInstance.ts          # API configuration & Interceptors
├── components/
│   ├── blog/
│   │   ├── BlogCard.tsx          # Blog item display
│   │   ├── BlogDetails.tsx       # Detailed post view
│   │   └── PostForm.tsx          # Create/Edit form
│   └── UI/
│       ├── Button.tsx            # Generic button component
│       └── Modal.tsx             # Reusable modal dialog
├── context/
│   └── ThemeContext.tsx          # Theme management (Context API)
├── hooks/
│   ├── useAuth.ts                # Authentication logic
│   └── usePosts.ts               # Blog data handling
├── pages/
│   ├── BlogDetailsPage.tsx       # Full screen post view
│   ├── BlogsPageIndex.tsx        # Dashboard / Main listing
│   ├── Login.tsx                 # Authentication screen
│   └── Register.tsx              # Account creation screen
├── store/
│   ├── authStore.ts              # Zustand Auth state
│   └── postStore.ts              # Zustand Posts state
└── types/
    └── index.d.ts                # Global TypeScript interfaces
```

## 🚀 Quick Start
1. `npm install` in both folders.
2. Setup `.env` for API and Database.
3. Run `npm run dev`.
