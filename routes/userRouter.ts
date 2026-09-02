import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.json({
        message: "hey this page is working"
    })
});

userRouter.get("/:name", (req, res) => {
    const { name } = req.params;
    res.json({
        message: `I got you nigga ${name}`
    })
})

export default userRouter;