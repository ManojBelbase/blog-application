import { useEffect } from "react";
import { usePostStore } from "../store/postStore";

export const usePosts = () => {
    const {
        posts,
        loading: isLoading,
        error,
        fetchPosts,
        addPost: storeAdd,
        updatePost: storeUpdate,
        deletePost,
        fetchPostById
    } = usePostStore();

    useEffect(() => {
        if (posts.length === 0) {
            fetchPosts().catch(() => { });
        }
    }, [posts.length, fetchPosts]);

    const addPost = async (data: { title: string; content: string; category: string }) => {
        return storeAdd(data.title, data.content, data.category);
    };

    const updatePost = async ({ id, title, content, category }: { id: string; title: string; content: string; category: string }) => {
        return storeUpdate(id, title, content, category);
    };

    return {
        posts,
        isLoading,
        error,
        addPost,
        updatePost,
        deletePost,
        fetchPostById,
        isActionLoading: isLoading
    };
};
