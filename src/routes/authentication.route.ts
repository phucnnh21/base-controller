import express from "express";
import { AuthenticationController } from "../controllers/authentication.controller";
export const authRouter = express.Router();

const authController = new AuthenticationController();

const path = "/auth";

authRouter.post(`${path}/register`, authController.register);
authRouter.post(`${path}/login`, authController.login);
authRouter.post(`${path}/logout`, authController.logout);
authRouter.post(`${path}/refresh`, authController.refresh);
