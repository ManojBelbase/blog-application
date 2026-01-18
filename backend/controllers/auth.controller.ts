import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { response } from "../utils/response";

const SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return response(res, 400, "Missing fields");

        const exists = await User.findOne({ username });
        if (exists) return response(res, 400, "User exists");

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashed });

        return response(res, 201, "User registered successfully", { user: { id: user._id, username } });
    } catch (err: any) {
        return response(res, 500, err.message || "Server error");
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return response(res, 400, "Invalid credentials");

        const match = await bcrypt.compare(password, user.password);
        if (!match) return response(res, 400, "Invalid credentials");

        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
        return response(res, 200, "Login successful", { token, user: { id: user._id, username } });
    } catch (err: any) {
        return response(res, 500, err.message || "Server error");
    }
};
