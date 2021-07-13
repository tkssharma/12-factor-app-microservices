export interface ConfigDBData {
    url?: string;
}
export interface SearchLogUpload {
    connectionString?: string;
    containerName?: string;
}
export interface NeutrinoConfig {
    provider: string;
    api_key: string;
    user_id: string;
}
export declare type LogoUpload = SearchLogUpload;
export interface AzureConfig {
    searchLogUpload: SearchLogUpload;
    logoUpload: LogoUpload;
}
export interface ConfigAuthData {
    jwksuri: string;
    audience?: string;
    tokenIssuer: string;
    authProvider: string;
}
export interface ConfigAuthorizationData {
    baseUrl: string;
    serviceClientToken: string;
}
export interface PlatformAPIs {
    baseUrl: string;
    token: string;
}
export interface ConfigData {
    env: string;
    auth: ConfigAuthData;
    authorization: ConfigAuthorizationData;
    platformApis: PlatformAPIs;
    db: ConfigDBData;
    azure: AzureConfig;
    neutrino: NeutrinoConfig;
    logLevel: string;
    newRelicKey?: string;
}
