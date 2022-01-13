import express, { Response } from "express";
import { ProductController } from "../controllers/product.controller";
export const productRouter = express.Router();

const productController = new ProductController();

const path = "/product";

productRouter.get(path, (req: any, res: Response) => {
    productController.find(req, res, { name: 1 });
});

productRouter.get(`${path}/:id`, (req: any, res: Response) => {
    productController.findById(req, res);
});

productRouter.post(path, productController.create);

productRouter.put(`${path}/:id`, productController.update);

productRouter.delete(`${path}/:id`, productController.delete);
