import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Basic Configuration (middlewares // plugins)
app.use(
  express.json({
    limit: "16kb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  }),
);

app.use(express.static("public"));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

// import the all routes

import healthCheckRoute from "./src/routes/healthCheck.routes.js";
import authRoute from "./src/routes/auth.routes.js";

app.use("/api/v1/healthcheck", healthCheckRoute);
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Welcome to E Pharmacy Management System");
});

export default app;
