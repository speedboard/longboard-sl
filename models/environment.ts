export interface Environment {
    hosts: string[];
    datasource: string;
    user: string;
    password: string;
    options?: {
        ssl?: boolean,
        authSource?: string,
        autoReconnect?: boolean,
        socketTimeoutMS?: number,
        connectTimeoutMS?: number,
        replicaSet?: string
    },
    loggerLevel?: string
}
