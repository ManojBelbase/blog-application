import { create } from 'zustand';
import api from '../axios/axiosInstance';
import type { PostState } from '../types';
export const usePostStore = create<PostState>((set, get) => ({
    posts: [],
    loading: false,
    error: null,

    fetchPostById: async (id) => {
        const existing = get().posts.find(p => p._id === id);
        if (existing) return existing;

        set({ loading: true, error: null });
        try {
            const res = await api.get(`/posts/${id}`);
            return res.data.data;
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to fetch post' });
            return null;
        } finally {
            set({ loading: false });
        }
    },

    fetchPosts: async () => {
        set({ loading: true, error: null });
        try {
            const res = await api.get('/posts');
            set({ posts: res.data.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to fetch posts' });
        } finally {
            set({ loading: false });
        }
    },

    addPost: async (title, content, category) => {
        set({ loading: true, error: null });
        try {
            const res = await api.post('/posts', { title, content, category });
            const newPost = res.data.data;
            set(state => ({ posts: [newPost, ...state.posts] }));
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to create post' });
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    updatePost: async (id, title, content, category) => {
        set({ loading: true, error: null });
        try {
            const res = await api.put(`/posts/${id}`, { title, content, category });
            const updatedPost = res.data.data;
            set(state => ({
                posts: state.posts.map(p => p._id === id ? updatedPost : p)
            }));
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to update post' });
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    deletePost: async (id) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/posts/${id}`);
            set(state => ({
                posts: state.posts.filter(p => p._id !== id)
            }));
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to delete post' });
            throw error;
        } finally {
            set({ loading: false });
        }
    }
}));
