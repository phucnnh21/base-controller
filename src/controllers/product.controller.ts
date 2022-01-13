import { BaseController } from "./base.controller";
import { IProduct } from "../interfaces/IModel";
import Product from "../models/Product";

export class ProductController extends BaseController<IProduct> {
    constructor() {
        super(Product);
    }
}
