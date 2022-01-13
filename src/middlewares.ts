import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { COOKIES } from "./config";

export const middlewares = [cors(), express.json(), cookieParser(COOKIES)];
