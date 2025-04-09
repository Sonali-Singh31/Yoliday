import { body } from "express-validator";

export const validateAddToCart = [
  body("project_id")
    .isInt({ gt: 0 })
    .withMessage("project_id must be a positive integer"),
];
