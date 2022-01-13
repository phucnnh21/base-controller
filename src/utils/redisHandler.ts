const redis = require("redis");

import { REDIS } from "../config";

const client = redis.createClient({
    socket: {
        port: REDIS.port,
        host: REDIS.host,
    },
    password: REDIS.password,
});

client.on("connect", function () {
    console.log("Redis Database connected" + "\n");
});

client.on("error", (err: any) => {
    console.log("Error " + err);
});

client.connect();

const redisClient = {
    set: (key: string, value: string) => {
        client.set(key, value);
    },

    get: (key: string) => {
        return new Promise((resolve, reject) => {
            client.get(key, (error: any, result: any) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve(result);
            });
        });
    },

    delete: (key: string) => {
        return client.del(key);
    },

    close: () => {
        client.quit();
    },
};

export default redisClient;
