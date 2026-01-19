import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
    title: string;
    content: string;
    category?: string;
    author: mongoose.Types.ObjectId;
}

const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: "General" },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model<IPost>("Post", postSchema);
