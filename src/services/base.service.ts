import { Model } from "mongoose";
import { IService } from "../interfaces/IModel";
import { IPopulate, ISelect } from "../interfaces/IQuery";

export class BaseService<T extends Document> implements IService<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    public async find(
        select: ISelect<T>,
        populates: IPopulate[]
    ): Promise<T[]> {
        return await this.model.find({}).select(select).populate(populates);
    }

    public async findById(
        id: string,
        select: ISelect<T>,
        populates?: IPopulate[]
    ): Promise<T> {
        return await this.model.findById(id).select(select).populate(populates);
    }

    public async findOne(
        query: any,
        select: ISelect<T>,
        populates?: IPopulate[]
    ): Promise<T> {
        return await this.model
            .findOne(query)
            .select(select)
            .populate(populates);
    }

    public async findMany(
        query: any,
        select: ISelect<T>,
        populates?: IPopulate[]
    ): Promise<T[]> {
        return await this.model.find(query).select(select).populate(populates);
    }

    public async create(data: any): Promise<T> {
        return await this.model.create(data);
    }

    public async update(id: string, data: T): Promise<T | void> {
        let document: any = await this.model.findById(id);

        if (document) {
            for (let key in data) {
                if (data[key]) {
                    document[key] = data[key];
                }
            }

            return await document.save();
        }
    }

    public async delete(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id);
    }
}
