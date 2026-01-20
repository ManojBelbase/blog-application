import { useState, useMemo } from "react";
import { usePosts } from "../hooks/usePosts";
import { PostForm } from "../components/blog/PostForm";
import { PageHeader } from "../components/PageHeader";
import { Modal } from "../components/Modal";
import { ConfirmModal } from "../components/UI/ConfirmModal";
import { DataTable } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { TableActions } from "../components/TableAction";
import { dateFormater } from "../utils/dateFormater";
import type { Post } from "../types";

export const BlogsPageIndex = () => {
    const { posts, isLoading, error, addPost, updatePost, deletePost } = usePosts();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [modalState, setModalState] = useState<{ mode: 'create' | 'edit' | 'none'; data?: Post }>({ mode: 'none' });

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category === "All" || post.category === category;
            return matchesSearch && matchesCategory;
        });
    }, [posts, search, category]);

    const handleCreate = async (title: string, content: string, category: string) => {
        try {
            await addPost({ title, content, category });
            setModalState({ mode: 'none' });
        } catch (err) { }
    };

    const handleUpdate = async (title: string, content: string, category: string) => {
        if (!modalState.data) return;
        try {
            await updatePost({ id: modalState.data._id, title, content, category });
            setModalState({ mode: 'none' });
        } catch (err) { }
    };

    const tableData = useMemo(() => ({
        columns: [
            { header: "Title", key: "title" },
            { header: "Category", key: "category" },
            { header: "Published", key: "createdAt" },
            { header: "Actions", key: "actions" },
        ],
        rows: filteredPosts.map((post) => ({
            id: post._id,
            title: post.title,
            category: <StatusBadge status={post.category} />,
            createdAt: dateFormater(post.createdAt),
            actions: (
                <div className="flex justify-end">
                    <TableActions
                        id={post._id}
                        onEdit={() => setModalState({ mode: 'edit', data: post })}
                        onDelete={setConfirmDeleteId}
                    />
                </div>
            )
        }))
    }), [filteredPosts]);

    return (
        <div className="sm:space-y-10 space-y-6 pb-6 sm:pb-12 ">
            <PageHeader
                title="Manage Blogs"
                actionLabel="Create Blog"
                onClick={() => setModalState({ mode: 'create' })}
            />
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex-1 flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[200px]">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-(--text-secondary) mb-1 block">Search</label>
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-(--bg-primary) border border-(--border-color) p-2 text-sm focus:outline-none focus:border-(--text-primary) transition-colors"
                        />
                    </div>
                    <div className="w-[150px]">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-(--text-secondary) mb-1 block">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-(--bg-primary) border border-(--border-color) p-2 text-sm focus:outline-none focus:border-(--text-primary) transition-colors"
                        >
                            <option value="All">All Categories</option>
                            <option value="General">General</option>
                            <option value="Technology">Technology</option>
                            <option value="Life">Life</option>
                            <option value="Art">Art</option>
                        </select>
                    </div>
                </div>

            </div>

            <div className="bg-(--bg-primary) border border-(--border-color) overflow-hidden">
                <DataTable
                    columns={tableData.columns}
                    data={tableData.rows}
                    keyField="id"
                    pageSize={10}
                    loading={isLoading}
                    error={error}
                    emptyMessage="No blogs found."
                />
            </div>

            <Modal
                opened={modalState.mode !== 'none'}
                onClose={() => setModalState({ mode: 'none' })}
                title={modalState.mode === 'create' ? "Create Blog" : "Edit Blog"}
                size="5xl"
            >
                <PostForm
                    key={modalState.mode === 'edit' ? modalState.data?._id : 'create'}
                    post={modalState.data}
                    loading={isLoading}
                    onCancel={() => setModalState({ mode: 'none' })}
                    onSubmit={modalState.mode === 'edit' ? handleUpdate : handleCreate}
                />
            </Modal>

            <ConfirmModal
                opened={!!confirmDeleteId}
                onClose={() => setConfirmDeleteId(null)}
                onConfirm={() => {
                    if (confirmDeleteId) {
                        deletePost(confirmDeleteId);
                        setConfirmDeleteId(null);
                    }
                }}

                loading={isLoading}
            />
        </div>
    );
};
