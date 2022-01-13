import { BaseController } from "./base.controller";
import { IOrder } from "../interfaces/IModel";
import Order from "../models/Order";

export class OrderController extends BaseController<IOrder> {
    constructor() {
        super(Order);
    }
}
