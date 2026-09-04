import { Request, Response } from "express";
import { db } from "../src/prisma/db";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    //check if user is exist or not
    const userExist = await db.orm.public.User
        .where({ email })
        .first();

    if (userExist) {
        return res.status(400).json({
            error: "User already exist with this gmail"
        })
    }
    //hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await db.orm.public.User.create({
        name,
        email,
        password: hashedPassword
    });

    //generate Token
    const token = generateToken(user.id, res);

    res.status(200).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        }
    })
}
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    //check if user exist or not
    const user = await db.orm.public.User
        .where({ email })
        .first();

    if (!user) {
        return res.status(401).json({
            error: "Ivalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            error: "Ivalid email or password"
        })
    }

    //generate Token
    const token = generateToken(user.id, res);

    res.status(200).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: user.email
            },
            token
        }
    })
}

const logout = async (req: Request, res: Response) => {

    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({
        status: "success",
        message: "user logout successfully"
    })
}


export { register, login, logout };