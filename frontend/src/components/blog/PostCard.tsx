import { Link } from "react-router-dom";
import { PATH } from "../../const/Path";
import { dateFormater } from "../../utils/dateFormater";
import type { Post } from "../../types";

interface PostCardProps {
    post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
    const detailsPath = PATH.BLOG_DETAILS.replace(":id", post._id);

    return (
        <div className="bg-(--bg-primary)  p-4 rounded-md sm:p-8 border border-(--border-color) h-full flex flex-col group">
            <Link to={detailsPath} className="block overflow-hidden mb-6">
                <div className="w-full h-48 bg-(--bg-secondary) flex items-center justify-center border border-(--border-color) transition-colors">
                    <p className="text-4xl font-black uppercase tracking-tighter transition-all">
                        {post.title.charAt(0)}
                    </p>
                </div>
            </Link>

            <Link to={detailsPath} className="block transition-colors mb-2">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight line-clamp-2">
                    {post.title}
                </h3>
            </Link>

            <div
                className="text-(--text-secondary) text-sm mb-6 line-clamp-2 blog-content flex-1"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-auto pt-6 border-t border-(--border-color)">
                <div className="flex gap-4">
                    <span>@{post.author?.username}</span>
                    <span>{dateFormater(post.createdAt)}</span>
                </div>
                <Link to={detailsPath} className="text-(--text-primary) hover:text-(--accent) transition-colors">Read More</Link>
            </div>
        </div>
    );
};
