import express, { Response } from "express";
import { ReviewController } from "../controllers/review.controller";
export const reviewRouter = express.Router();

const reviewController = new ReviewController();

const path = "/order";

reviewRouter.get(path, (req: any, res: Response) => {
    reviewController.find(req, res, { name: 1 });
});

reviewRouter.get(`${path}/:id`, (req: any, res: Response) => {
    reviewController.findById(req, res);
});

reviewRouter.post(path, reviewController.create);

reviewRouter.put(`${path}/:id`, reviewController.update);

reviewRouter.delete(`${path}/:id`, reviewController.delete);
