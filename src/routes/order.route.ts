import express, { Response } from "express";
import { OrderController } from "../controllers/order.controller";
export const orderRouter = express.Router();

const orderController = new OrderController();

const path = "/order";

orderRouter.get(path, (req: any, res: Response) => {
    orderController.find(req, res, { name: 1 });
});

orderRouter.get(`${path}/:id`, (req: any, res: Response) => {
    orderController.findById(req, res);
});

orderRouter.post(path, orderController.create);

orderRouter.put(`${path}/:id`, orderController.update);

orderRouter.delete(`${path}/:id`, orderController.delete);
