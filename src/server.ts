import express from "express";
import userRouter from "../routes/userRouter";
import { connectDB, disconnectDB } from "./prisma/db";
import authRouter from "../routes/authRoutes";
import watchListRouter from "../routes/watchListRoutes";

const PORT = 6969;
const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/watchlist", watchListRouter);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome",
        extramessage: "aur bol baki sab thik chal raha"
    });
});

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Your server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("DATABASE CONNECTION FAILED", error);
        process.exit(1);
    }
}

process.on("SIGINT", async () => {
    await disconnectDB();
    process.exit(0);
});

process.on("SIGTERM", async () => {
    await disconnectDB();
    process.exit(0);
});

startServer();