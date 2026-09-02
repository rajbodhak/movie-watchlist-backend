import { Request, Response } from "express";
import { db } from "../src/prisma/db";

const getUserWatchlist = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user.id;

        const watchlist = await db.orm.public.WatchlistItem
            .where({ userId })
            .all();

        return res.status(200).json(watchlist);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch watchlist"
        });
    }
};

const addMovieToWatchlist = async (req: Request, res: Response) => {

}

const deleteMovieFromWatchlist = async (req: Request, res: Response) => {

}

export {
    getUserWatchlist,
    addMovieToWatchlist,
    deleteMovieFromWatchlist
}