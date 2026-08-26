// import "dotenv/config";
import { defineConfig } from "drizzle-kit";

console.log("Database URL:", process.env.DATABASE_URL);

export default defineConfig({
  out: "./drizzle",
  schema: "./src/models/index.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
