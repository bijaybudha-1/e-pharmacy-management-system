import dotenv from "dotenv";

// Load environment variables before importing application modules.
dotenv.config();

const { default: app } = await import("./app.js");

const port = process.env.PORT ?? 8000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
