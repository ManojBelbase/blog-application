export interface RouteItem {
    path: string | "";
    element: any;
    protected: boolean
}

export interface Column<T> {
    header: string;
    key: keyof T | string;
    render?: (item: T) => React.ReactNode;
    className?: string;
}

export interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyField: keyof T;
    pageSize?: number;
    loading?: boolean;
    error?: string | null;
    emptyMessage?: string;
}

export interface ModalProps {
    opened: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
}

export interface PageHeaderProps {
    title: string;
    onClick?: () => void;
    actionLabel?: string;
    actionVariant?: 'primary' | 'outline' | 'danger';
}

export interface TableActionsProps {
    id: string;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => Promise<void> | void;
}


export interface SidebarProps {
    currentPath: string;
    isOpen: boolean;
    onClose: () => void;
}


export interface Post {
    _id: string;
    title: string;
    content: string;
    category: string;
    author: {
        _id: string;
        username: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface PostFormProps {
    post?: Post | null;
    onSubmit: (title: string, content: string, category: string) => void;
    onCancel: () => void;
    loading: boolean;
}

export interface PostState {
    posts: Post[];
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
    addPost: (title: string, content: string, category: string) => Promise<void>;
    updatePost: (id: string, title: string, content: string, category: string) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
    fetchPostById: (id: string) => Promise<Post | null>;
}

export interface User {
    id: string;
    username: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}