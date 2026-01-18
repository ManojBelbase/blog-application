import { Request, Response } from "express";
import Post from "../models/post.model";
import { AuthRequest } from "../middlewares/auth.middleware";
import { response } from "../utils/response";

export const getPosts = async (_req: Request, res: Response) => {
    try {
        const posts = await Post.find().populate("author", "username");
        return response(res, 200, "Posts fetched successfully", posts);
    } catch (error: any) {
        return response(res, 500, error.message);
    }
};

export const createPost = async (req: AuthRequest, res: Response) => {
    try {
        const { title, content } = req.body;
        const author = req.user?.id;
        if (!author) return response(res, 401, "Unauthorized");

        let post = await Post.create({ title, content, author });
        post = await post.populate("author", "username");

        return response(res, 201, "Post created successfully", post);
    } catch (error: any) {
        return response(res, 500, error.message);
    }
};

export const updatePost = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = await Post.findById(id);

        if (!post) return response(res, 404, "Post not found");

        // Ensure author is treated as string for comparison if it's an ObjectId
        if (post.author.toString() !== req.user?.id) return response(res, 403, "Forbidden");

        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();

        await post.populate("author", "username");

        return response(res, 200, "Post updated successfully", post);
    } catch (error: any) {
        return response(res, 500, error.message);
    }
};

export const deletePost = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) return response(res, 404, "Post not found");

        // Ensure author is treated as string for comparison
        if (post.author.toString() !== req.user?.id) return response(res, 403, "Forbidden");

        await Post.deleteOne({ _id: id });
        return response(res, 200, "Post deleted successfully");
    } catch (error: any) {
        return response(res, 500, error.message);
    }
};
