import React, { useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { Editor } from "../UI/Editor";
import { Dropdown } from "../UI/Dropdown";
import { postSchema } from "./PostSchema";
import type { PostFormProps } from "../../types";

export const PostForm = ({ post, onSubmit, onCancel, loading }: PostFormProps) => {
    const [formData, setFormData] = useState({
        title: post?.title || "",
        content: post?.content || "",
        category: post?.category || "General"
    });
    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await postSchema.validate(formData, { abortEarly: false });
            onSubmit(formData.title, formData.content, formData.category);
        } catch (err: any) {
            if (err.inner) {
                const validationErrors: Partial<Record<keyof typeof formData, string>> = {};
                setErrors(validationErrors);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-4">
                <Input
                    label="Title"
                    placeholder="Enter an eye-catching title..."
                    value={formData.title}
                    error={errors.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                />

                <Dropdown
                    label="Category"
                    value={formData.category}
                    onChange={(val) => handleInputChange("category", val)}
                    options={[
                        { value: "General", label: "General" },
                        { value: "Technology", label: "Technology" },
                        { value: "Life", label: "Life" },
                        { value: "Art", label: "Art" },
                    ]}
                    error={errors.category}
                />

                <Editor
                    label="Content"
                    value={formData.content}
                    error={errors.content}
                    onChange={(val) => handleInputChange("content", val)}
                />
            </div>

            <div className="flex gap-4 pt-4">
                <Button type="submit" loading={loading} className="flex-1 uppercase tracking-widest text-xs font-bold">
                    {post ? "Update Blog" : "Create Blog"}
                </Button>
                <Button type="button" variant="outline" onClick={onCancel} className="uppercase tracking-widest text-xs font-bold">
                    Discard
                </Button>
            </div>
        </form>
    );
};
