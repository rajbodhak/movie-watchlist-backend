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
    try {
        const userId = req.user.id;
        const { movieId, rating, status, notes } = req.body;

        //check if movie is already present in db or not
        const movie = await db.orm.public.Movie
            .where({ id: movieId })
            .all();

        if (!movie) {
            return res.status(404).json({
                message: "Movie Not Found"
            })
        }

        //check if movie is already present in watchlist or not
        const existingWathclist = await db.orm.public.WatchlistItem
            .where({
                userId,
                movieId
            }).all();

        if (existingWathclist.length > 0) {
            return res.status(400).json({
                message: "Movie is already present in Watchlist"
            })
        }

        const watchlistItem = await db.orm.public.WatchlistItem
            .create({
                userId,
                movieId,
                status: status || "PLANNED",
                rating,
                notes
            });

        return res.status(201).json({
            message: "Movie added to Watchlist Successfully",
            data: {
                watchlistItem
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to add movie to watchlist"
        });
    }
}

const deleteMovieFromWatchlist = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user.id;
        const { movieId } = req.params as { movieId: string };

        const watchlistItem = await db.orm.public.WatchlistItem
            .where({ userId, movieId })
            .all();

        if (watchlistItem.length === 0) {
            return res.status(404).json({
                message: "Movie not found in watchlist"
            });
        }

        await db.orm.public.WatchlistItem
            .where({
                id: watchlistItem[0].id
            })
            .delete();

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            message: "Failed to remove movie from watchlist"
        });
    }
};

export {
    getUserWatchlist,
    addMovieToWatchlist,
    deleteMovieFromWatchlist
}