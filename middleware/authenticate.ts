import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        let token;

        // Check Authorization header
        if (authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        // If no header token, check cookie
        if (!token) {
            token = req.cookies.jwt;
        }

        // No token anywhere
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_TOKEN!
        ) as { id: string };

        // Attach user to request
        req.user = {
            id: decoded.id
        };

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};