import { BaseController } from "./base.controller";
import { IReview } from "../interfaces/IModel";
import Review from "../models/Order";

export class ReviewController extends BaseController<IReview> {
    constructor() {
        super(Review);
    }
}
