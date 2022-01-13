import { Response } from "express";
import bcrypt from "bcrypt";
import { BaseController } from "./base.controller";
import { IUser } from "../interfaces/IModel";
import User from "../models/User";
import { generateToken, verifyToken } from "../utils/tokenHandler";
// import redisClient from "../utils/redisHandler";

export class AuthenticationController extends BaseController<IUser> {
    constructor() {
        super(User);
    }

    private loginResponse = async (user: IUser, res: Response) => {
        try {
            // Generate token
            const accessToken = generateToken(user, "access");
            const refreshToken = generateToken(user, "refresh");

            // Set refresh token in redis
            // redisClient.set(user._id.toString(), refreshToken);

            // Use cookie to hold refresh token
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                sameSite: "none",
                secure: true,
                signed: true,
            });

            // Data return to client
            const data = {
                id: user._id,
                username: user.name,
                avatar: user.avatar,
                accessToken,
            };

            return this.jsonResponse(res, 200, data);
        } catch (err) {
            console.log(err);
        }
    };

    public register = async (req: any, res: Response) => {
        // Check if user exists
        const existUser = await this.service.findOne(
            { email: req.body.email },
            {}
        );

        if (existUser) {
            return this.errorResponse(res, "CONFLICT");
        }

        // Hash password
        const hashPassword = await bcrypt.hash(req.body.password, 12);

        // Create user
        await this.service.create({
            ...req.body,
            password: hashPassword,
        });

        return this.jsonResponse(res, 201, {});
    };

    public login = async (req: any, res: Response) => {
        // Check if user exists
        const existUser = await this.service.findOne(
            { email: req.body.email },
            {}
        );

        if (!existUser) {
            return this.errorResponse(res, "NOT_FOUND");
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            existUser.password as string
        );

        if (!isPasswordCorrect) {
            return this.errorResponse(res, "UNAUTHORIZED");
        }

        this.loginResponse(existUser, res);
    };

    public logout = async (req: any, res: Response) => {
        // Get refresh token from cookie
        const refreshToken = req.signedCookies.refreshToken;

        // Check if refresh token is valid
        const verifiedToken = await verifyToken(refreshToken, "refresh", true);

        // Delete refresh token from redis
        // redisClient.delete(verifiedToken.id);

        // Delete refresh token from cookie
        res.clearCookie("refreshToken");
        return this.jsonResponse(res, 200, {});
    };

    public refresh = async (req: any, res: Response) => {
        // Get refresh token from cookie
        const refreshToken = req.signedCookies.refreshToken;

        // Check if refresh token is valid
        const verifiedToken = await verifyToken(refreshToken, "refresh");

        if (!verifiedToken) {
            return this.errorResponse(res, "UNAUTHORIZED");
        }

        // const tokenFromSession = redisClient.get(verifiedToken.id);

        // if (!tokenFromSession) {
        //     return this.errorResponse(res, "UNAUTHORIZED");
        // }

        // Check if user is exist
        const existUser = await this.service.findOne(
            { _id: verifiedToken.id },
            {}
        );

        if (!existUser) {
            return this.errorResponse(res, "NOT_FOUND");
        }

        this.loginResponse(existUser, res);
    };
}
