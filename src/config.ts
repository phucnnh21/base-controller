import { IEnv, IRedisConfig } from "./interfaces/IEnv";

export const ENV: IEnv = {
    port: 5000,
    domain: "",
    apiPath: "",
    staticPath: "",
    db: {
        name: "",
        user: "",
        pwd: "",
        account: "",
        uri: (user: string, pwd: string, name: string, account: string) => {
            return `mongodb+srv://${user}:${pwd}${account}.mongodb.net/${name}?retryWrites=true&w=majority`;
        },
    },
};

export const REDIS: IRedisConfig = {
    host: "",
    port: 18132,
    password: "",
};

export const ACCESS_KEY = "access";
export const REFRESH_KEY = "refresh";
export const COOKIES = "cookies";
