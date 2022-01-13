import { Response } from "express";
import { Model } from "mongoose";
import { BaseService } from "../services/base.service";
import { IPopulate, ISelect } from "../interfaces/IQuery";

export abstract class BaseController<T extends Document> {
    protected service: BaseService<T>;

    /**
     * Constructor to initialize the service
     */
    constructor(model: Model<T>) {
        this.service = new BaseService(model);
    }

    protected jsonResponse = (res: Response, status: number, data: any) => {
        return res.status(status).json(data);
    };

    protected errorResponse = (res: Response, errorType: string) => {
        return res
            .status(ERRORS[errorType].status)
            .json({ message: ERRORS[errorType].message });
    };

    public find = async (
        req: any,
        res: Response,
        select: ISelect<T> = {},
        populates: IPopulate[] = []
    ) => {
        try {
            const data = await this.service.find(select, populates);
            return this.jsonResponse(res, 200, data);
        } catch (error) {
            return this.errorResponse(res, "NOT_FOUND");
        }
    };

    public findById = async (
        req: any,
        res: Response,
        select: ISelect<T> = {},
        populates: IPopulate[] = []
    ) => {
        try {
            const data = await this.service.findById(
                req.params.id,
                select,
                populates
            );
            return this.jsonResponse(res, 200, data);
        } catch (error) {
            return this.errorResponse(res, "NOT_FOUND");
        }
    };

    public findOne = async (
        req: any,
        res: Response,
        select: ISelect<T> = {},
        populates: IPopulate[] = []
    ) => {
        try {
            const data = await this.service.findOne(
                req.body,
                select,
                populates
            );
            return this.jsonResponse(res, 200, data);
        } catch (error) {
            return this.errorResponse(res, "NOT_FOUND");
        }
    };

    public findMany = async (
        req: any,
        res: Response,
        select: ISelect<T> = {},
        populates: IPopulate[] = []
    ) => {
        try {
            const data = await this.service.findMany(
                req.body,
                select,
                populates
            );
            return this.jsonResponse(res, 200, data);
        } catch (error) {
            return this.errorResponse(res, "NOT_FOUND");
        }
    };

    public create = async (req: any, res: Response) => {
        try {
            const data = await this.service.create(req.body);
            return this.jsonResponse(res, 201, data);
        } catch (error) {
            return this.errorResponse(res, "INTERNAL_SERVER_ERROR");
        }
    };

    public update = async (req: any, res: Response) => {
        try {
            const data = await this.service.update(req.params.id, req.body);
            return this.jsonResponse(res, 204, data);
        } catch (error) {
            return this.errorResponse(res, "NOT_FOUND");
        }
    };

    public delete = async (req: any, res: Response) => {
        try {
            const data = await this.service.delete(req.params.id);
            return this.jsonResponse(res, 204, data);
        } catch (error) {
            return this.errorResponse(res, "NOT_FOUND");
        }
    };
}

type Error = {
    status: number;
    message: string;
};

type Errors = {
    [key: string]: Error;
};

const ERRORS: Errors = {
    BAD_REQUEST: {
        status: 400,
        message: "Bad request",
    },
    UNAUTHORIZED: {
        status: 401,
        message: "Unauthorized",
    },
    FORBIDDEN: {
        status: 403,
        message: "Forbidden",
    },
    NOT_FOUND: {
        status: 404,
        message: "Not found",
    },
    CONFLICT: {
        status: 409,
        message: "Conflict",
    },
    TOO_MANY_REQUESTS: {
        status: 429,
        message: "Too many requests",
    },
    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: "Internal server error",
    },
};
