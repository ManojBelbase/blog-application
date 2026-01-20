import * as yup from "yup";

export const postSchema = yup.object().shape({
    title: yup.string().required("Headline is required").min(3, "Headline is too short"),
    content: yup.string().required("Content is required").min(10, "Content must be at least 10 characters"),
    category: yup.string().required("Category is required"),
});
