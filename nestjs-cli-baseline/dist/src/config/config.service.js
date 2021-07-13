"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const url_join_ts_1 = require("url-join-ts");
const config_default_1 = require("./config.default");
let ConfigService = class ConfigService {
    constructor(data = config_default_1.DEFAULT_CONFIG) {
        this.config = data;
    }
    loadFromEnv() {
        this.config = this.parseConfigFromEnv(process.env);
    }
    parseConfigFromEnv(env) {
        return {
            env: env.NODE_ENV || config_default_1.DEFAULT_CONFIG.env,
            db: this.parseDbConfigFromEnv(env, config_default_1.DEFAULT_CONFIG.db),
            logLevel: env.LOG_LEVEL || config_default_1.DEFAULT_CONFIG.logLevel,
            newRelicKey: env.NEW_RELIC_KEY || config_default_1.DEFAULT_CONFIG.newRelicKey,
            auth: this.parseAuthConfigFromEnv(env),
            azure: this.parseAzureConfigFromEnv(env, config_default_1.DEFAULT_CONFIG.azure),
            authorization: this.parseAuthorizationConfigFromEnv(env),
            neutrino: this.parseNeutrinoConfigFromEnv(env, config_default_1.DEFAULT_CONFIG.neutrino),
            platformApis: this.parseNotificationsConfigFromEnv(env),
        };
    }
    parseNeutrinoConfigFromEnv(env, defaultConfig) {
        return {
            provider: env.VALIDATE_DATA_PROVIDER || defaultConfig.provider,
            user_id: env.NEUTRINO_USER_ID || defaultConfig.user_id,
            api_key: env.NEUTRINO_API_KEY || defaultConfig.api_key,
        };
    }
    parseAzureConfigFromEnv(env, defaultConfig) {
        return {
            searchLogUpload: {
                connectionString: env.AZURE_SEARCH_LOG_STORAGE_CONNECTION_STRING ||
                    defaultConfig.searchLogUpload.connectionString,
                containerName: env.AZURE_SEARCH_LOG_STORAGE_CONTAINER_NAME ||
                    defaultConfig.searchLogUpload.containerName,
            },
            logoUpload: {
                connectionString: env.AZURE_LOGO_STORAGE_CONNECTION_STRING ||
                    defaultConfig.logoUpload.connectionString,
                containerName: env.AZURE_LOGO_STORAGE_CONTAINER_NAME ||
                    defaultConfig.logoUpload.containerName,
            },
        };
    }
    parseAuthorizationConfigFromEnv(env) {
        return {
            baseUrl: env.BOUNCER_BASE_URL || '',
            serviceClientToken: env.BOUNCER_SERVICE_CLIENT_TOKEN || '',
        };
    }
    parseNotificationsConfigFromEnv(env) {
        return {
            baseUrl: env.PLATFORM_API_SERVICE_ACTIONS_URL || '',
            token: env.PLATFORM_API_SERVICE_ACTIONS_TOKEN || '',
        };
    }
    parseDbConfigFromEnv(env, defaultConfig) {
        return {
            url: env.DATABASE_URL || defaultConfig.url,
        };
    }
    parseAuthConfigFromEnv(env) {
        let jwksUrl = env.AUTH0_JWKS_URL || env.JWKS_URI || config_default_1.DEFAULT_CONFIG.auth.jwksuri;
        if (!/\/\.well-known\/jwks\.json$/i.test(jwksUrl)) {
            jwksUrl = url_join_ts_1.urlJoin(jwksUrl, '.well-known', 'jwks.json');
        }
        return {
            jwksuri: jwksUrl,
            audience: env.AUTH0_AUDIENCE_URL || env.AUDIENCE || config_default_1.DEFAULT_CONFIG.auth.audience,
            tokenIssuer: env.AUTH0_TOKEN_ISSUER_URL ||
                env.TOKEN_ISSUER ||
                config_default_1.DEFAULT_CONFIG.auth.tokenIssuer,
            authProvider: env.AUTH_PROVIDER || config_default_1.DEFAULT_CONFIG.auth.authProvider,
        };
    }
    get() {
        return this.config;
    }
};
ConfigService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Object])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map