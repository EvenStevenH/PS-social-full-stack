import express from "express";
import "dotenv/config";
import "./config/connection.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
	res.send("Hello, planet!");
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
