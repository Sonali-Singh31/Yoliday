import { Request, Response } from "express";
import { db } from "../db";

export const getProjects = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;

  try {
    const [rows] = await db.query("SELECT * FROM projects");
    res.json({ data: rows });
  } catch (error) {
    console.error("🔥 Error fetching projects:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
};
