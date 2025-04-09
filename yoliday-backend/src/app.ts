import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import projectRoutes from "./routes/projectRoutes";
import cartRoutes from "./routes/cartRoutes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

app.use("/projects", projectRoutes);
app.use("/cart", cartRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
