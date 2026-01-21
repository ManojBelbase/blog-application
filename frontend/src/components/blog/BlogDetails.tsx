import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '../../hooks/usePosts';
import { PATH } from '../../const/Path';
import { Icon } from '@iconify/react';
import { Shimmer } from '../UI/Shimmer';
import { dateFormater } from '../../utils/dateFormater';
import type { Post } from '../../types';

export const BlogDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { fetchPostById } = usePosts();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            if (id) {
                const data = await fetchPostById(id);
                setPost(data);
            }
            setLoading(false);
        };
        loadPost();
    }, [id, fetchPostById]);

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto py-20 px-6">
                <Shimmer count={1} itemClass="h-12 w-3/4 mb-10" containerClass="block" />
                <Shimmer count={1} itemClass="h-64 w-full mb-10" containerClass="block" />
                <Shimmer count={5} itemClass="h-4 w-full mb-4" containerClass="block" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="max-w-5xl mx-auto py-20 px-6 text-center">
                <h2 className="text-4xl font-bold mb-6">Blog not found.</h2>
                <Link to={PATH.HOME} className="text-(--accent) font-bold underline">Return Home</Link>
            </div>
        );
    }

    return (
        <article className="max-w-3xl mx-auto py-6 sm:py-10 sm:px-6 px-3">
            <Link to={PATH.HOME} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-(--text-secondary) hover:text-(--accent) mb-4 sm:mb-8 transition-colors">
                <Icon icon="lucide:arrow-left" />
                Back
            </Link>

            <header className="mb-6 sm:mb-12 ">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-(--accent) mb-6">
                    <span className="px-2 py-1 bg-(--bg-secondary) border border-(--border-color)">{post.category}</span>
                    <span className="text-gray-400 font-normal">{dateFormater(post.createdAt)}</span>
                </div>
                <h1 className="text-2xl sm:text-5xl font-bold tracking-tighter leading-tight mb-4">
                    {post.title}
                </h1>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-(--bg-secondary) flex items-center justify-center border border-(--border-color)">
                        <Icon icon="lucide:user" className="text-gray-400" />
                    </div>
                    <div>
                        <p className="text-sm font-bold">@{post.author?.username}</p>
                        <p className="text-xs text-gray-400">Written by</p>
                    </div>
                </div>
            </header>

            <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <footer className="sm:mt-16 mt-12 sm:pt-10 pt-6 border-t border-(--border-color) rounded-md">
                <div className="bg-(--bg-secondary) p-4 sm:p-12 text-center rounded-md">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4">Thanks for reading.</h3>
                    <p className="text-sm sm:text-base text-(--text-secondary) sm:mb-8 mb-4 max-w-md mx-auto">If you enjoyed this story, feel free to explore more publications from our community.</p>
                    <Link to={PATH.HOME} className="inline-block sm:px-8 px-4 sm:py-4 py-2 bg-(--accent) text-(--bg-primary) text-xs font-bold uppercase tracking-widest rounded-md">
                        Browse More Blogs
                    </Link>
                </div>
            </footer>
        </article>
    );
};
