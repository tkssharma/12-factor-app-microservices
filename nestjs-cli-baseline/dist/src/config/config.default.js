"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIG = void 0;
exports.DEFAULT_CONFIG = {
    env: 'production',
    db: {
        url: process.env.DATABASE_URL,
    },
    azure: {
        logoUpload: {
            connectionString: '',
            containerName: '',
        },
        searchLogUpload: {
            connectionString: '',
            containerName: '',
        },
    },
    neutrino: {
        provider: '',
        api_key: '',
        user_id: '',
    },
    auth: {
        jwksuri: 'https://auth.example.io/.well-known/jwks.json',
        audience: 'https://example.com/v1',
        tokenIssuer: 'https://auth.example.io/',
        authProvider: 'auth0',
    },
    authorization: {
        baseUrl: '',
        serviceClientToken: '',
    },
    platformApis: {
        baseUrl: '',
        token: '',
    },
    logLevel: 'info',
    newRelicKey: '',
};
//# sourceMappingURL=config.default.js.map