import { IPopulate, ISelect } from "./IQuery";
import { ObjectId } from "mongoose";

export interface IService<T> {
    find(select: ISelect<T>, populates?: IPopulate[]): Promise<T[]>;
    findById(
        id: string,
        select: ISelect<T>,
        populates?: IPopulate[]
    ): Promise<T>;
    findOne(
        query: any,
        select: ISelect<T>,
        populates?: IPopulate[]
    ): Promise<T>;
    findMany(
        query: any,
        select: ISelect<T>,
        populates?: IPopulate[]
    ): Promise<T[]>;
    create(data: T): Promise<T>;
    update(id: string, data: T): Promise<T | void>;
    delete(id: string): Promise<void>;
}

export interface IProduct extends Document {
    _id: ObjectId;
    name?: string;
    price?: number;
    description?: string;
    image?: string;
    categories?: string[];
    quantity?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUser extends Document {
    _id: ObjectId;
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IReview extends Document {
    _id: ObjectId;
    user?: ObjectId | IUser;
    product?: ObjectId | IProduct;
    content?: string;
    rating?: number;
    createdAt?: Date;
}

export interface IOrder extends Document {
    _id: ObjectId;
    user?: ObjectId | IUser;
    products?: ObjectId[] | IProduct[];
    total?: number;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
