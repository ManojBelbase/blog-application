import { usePosts } from "../hooks/usePosts";
import { PageHeader } from "../components/PageHeader";
import { Link } from "react-router-dom";
import { PATH } from "../const/Path";
import { Icon } from "@iconify/react";

export const Dashboard = () => {
    const { posts } = usePosts();

    const quickActions = [
        { label: "Manage Blogs", path: PATH.MANAGE_BLOGS, icon: "lucide:list", description: "View, edit and delete your posts" },
        { label: "View Public Site", path: PATH.HOME, icon: "lucide:external-link", description: "See how your blog looks to others" },
    ];

    return (
        <div className="space-y-12 pb-12">
            <PageHeader title="Overview" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-(--bg-secondary) p-8 border border-(--border-color)">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-(--text-secondary) mb-2">Total Blogs</p>
                    <p className="text-5xl font-black">{posts.length}</p>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {quickActions.map((action, i) => (
                        <Link
                            key={i}
                            to={action.path}
                            className="flex items-start gap-4 p-6 bg-(--bg-primary) border border-(--border-color) hover:border-(--accent) transition-all group"
                        >
                            <div className="p-3 bg-(--bg-secondary) text-(--text-primary) group-hover:text-(--accent) transition-colors">
                                <Icon icon={action.icon} className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-wider mb-1">{action.label}</h4>
                                <p className="text-xs text-(--text-secondary)">{action.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
