export interface IEnv {
    port: number;
    domain: string;
    apiPath: string;
    staticPath: string;
    db: IMongoDBConfig;
}

export interface IMongoDBConfig {
    name: string;
    user: string;
    pwd: string;
    account: string;
    uri: (user: string, pwd: string, name: string, account: string) => string;
}

export interface IRedisConfig {
    host: string;
    port: number;
    password: string;
}
