import { Request, Response } from "express";
import { db } from "../db";

export const addToCart = async (req: Request, res: Response) => {
  const { project_id } = req.body;

  try {
    const [project] = await db.query("SELECT id FROM projects WHERE id = ?", [
      project_id,
    ]);
    if ((project as any[]).length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    await db.query("INSERT INTO cart (project_id) VALUES (?)", [project_id]);
    res.status(201).json({ message: "Project added to cart" });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart" });
  }
};

export const getCart = async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query(`
      SELECT c.id AS cart_id, p.*
      FROM cart c
      JOIN projects p ON c.project_id = p.id
    `);
    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};
