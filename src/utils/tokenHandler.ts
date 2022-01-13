import jwt from "jsonwebtoken";

import { ACCESS_KEY, REFRESH_KEY } from "../config";
import { IUser } from "../interfaces/IModel";

export function generateToken(
    user: IUser,
    tokenType: "access" | "refresh"
): string {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
    };

    return tokenType === "access"
        ? jwt.sign(payload, ACCESS_KEY, {
              expiresIn: "1h",
          })
        : jwt.sign(payload, REFRESH_KEY, { expiresIn: "7d" });
}

export function verifyToken(
    token: string,
    tokenType: "access" | "refresh",
    ignoreExpiration: boolean = false
): any {
    try {
        const user = jwt.verify(
            token,
            tokenType === "access" ? ACCESS_KEY : REFRESH_KEY,
            {
                ignoreExpiration,
            }
        );
        return user;
    } catch (err) {
        return null;
    }
}
