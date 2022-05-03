import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();

//error handler
import "express-async-errors";

//routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobRoutes.js";

//connect to DB
import connectDB from "./db/connectDB.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

//parse json
app.use(express.json());

app.get("/api2", (req, res) => {
  res.json({ smg: "Welcome! sever side" });
});

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

//error
app.use(notFoundMiddleware, errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`sever listening port ${port} `);
    });
  } catch (error) {
    throw new Error(error);
  }
};

start();
