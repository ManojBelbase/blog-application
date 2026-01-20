import { usePosts } from "../hooks/usePosts";
import { PostCard } from "../components/blog/PostCard";
import { Shimmer } from "../components/UI/Shimmer";

export const Home = () => {
    const { posts, isLoading } = usePosts();

    return (
        <div className="sm:py-10 py-6 px-3">
            {/* Simple Header */}
            <section className=" border-black dark:border-white pb-6 sm:pb-12">
                <h1 className="text-2xl sm:text-5xl lg:text-5xl font-bold tracking-tighter">
                    BLOGS
                </h1>

            </section>


            {/* <Shimmer count={6} /> */}
            {isLoading ? (
                <Shimmer count={6} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-8 gap-6 w-full">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="transition-all rounded-2xl">
                                <PostCard post={post} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-40 text-center border-r border-b border-(--border-color)">
                            <p className="text-4xl font-black uppercase tracking-tighter opacity-20">No entries found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};