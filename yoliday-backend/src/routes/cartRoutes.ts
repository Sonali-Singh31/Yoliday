import express from "express";
import { getCart, addToCart } from "../controllers/cartController";
import { validateAddToCart } from "../middlewares/validators";
import { validationResult } from "express-validator";

const router = express.Router();

router.get("/", getCart);

router.post("/", validateAddToCart, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  addToCart(req, res, next);
});

export default router;
