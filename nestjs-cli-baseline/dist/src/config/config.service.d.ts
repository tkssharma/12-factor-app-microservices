import { ConfigData } from './config.interface';
export declare class ConfigService {
    private config;
    constructor(data?: ConfigData);
    loadFromEnv(): void;
    private parseConfigFromEnv;
    private parseNeutrinoConfigFromEnv;
    private parseAzureConfigFromEnv;
    private parseAuthorizationConfigFromEnv;
    private parseNotificationsConfigFromEnv;
    private parseDbConfigFromEnv;
    private parseAuthConfigFromEnv;
    get(): Readonly<ConfigData>;
}
