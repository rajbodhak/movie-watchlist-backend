import express from "express";
import { getUserWatchlist, addMovieToWatchlist, deleteMovieFromWatchlist } from "../controllers/watchListController";
const watchListRouter = express.Router();

watchListRouter.get("/", getUserWatchlist);
watchListRouter.post("/", addMovieToWatchlist);
watchListRouter.delete("/", deleteMovieFromWatchlist);

export default watchListRouter;