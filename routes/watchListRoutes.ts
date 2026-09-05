import express from "express";
import { getUserWatchlist, addMovieToWatchlist, deleteMovieFromWatchlist } from "../controllers/watchListController";
import { authenticate } from "../middleware/authenticate";

const watchListRouter = express.Router();

//authenticate middleware 
watchListRouter.use(authenticate);

watchListRouter.get("/", getUserWatchlist);
watchListRouter.post("/", addMovieToWatchlist);
watchListRouter.delete("/:movieId", deleteMovieFromWatchlist);

export default watchListRouter;