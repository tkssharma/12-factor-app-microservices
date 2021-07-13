import * as chai from 'chai';

import { DEFAULT_CONFIG } from './config.default';
import { ConfigData, ConfigDBData } from './config.interface';
import { ConfigService } from './config.service';

const MOCK_DB_CONFIG: ConfigDBData = {
  url: 'postgres://test:test@postgres:5432/postgres',
};

const MOCK_CONFIG: ConfigData = {
  env: 'testenv',
  db: MOCK_DB_CONFIG,
  logLevel: 'testloglevel',
  newRelicKey: 'testnewrelickey',
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
    user_id: '',
    api_key: '',
  },
  auth: {
    jwksuri: '',
    audience: '',
    tokenIssuer: '',
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
};

const ALL_ENV_KEYS = [
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
  'DB_HOST',
  'DB_DIALECT',
  'NODE_ENV',
  'ENVIRONMENT',
  'LOG_LEVEL',
  'NEW_RELIC_KEY',
];

describe('ConfigService', () => {
  let config: ConfigService;
  beforeEach(() => {
    for (const key of ALL_ENV_KEYS) {
      delete process.env[key];
    }
    config = new ConfigService();
  });

  describe('constructor', () => {
    it('should use default config if parameterless', () => {
      chai.expect(config.get()).to.deep.equal(DEFAULT_CONFIG);
    });

    it('should use passed config', () => {
      config = new ConfigService(MOCK_CONFIG);
      chai.expect(config.get()).to.deep.equal(MOCK_CONFIG);
    });
  });

  describe('loadFromEnv', () => {
    it('should use defaults when env vars are missing', () => {
      config.loadFromEnv();
      chai.expect(config.get().db).to.deep.equal({
        ...DEFAULT_CONFIG.db,
      });
    });

    it('should load base config properties from environment', () => {
      process.env.NODE_ENV = MOCK_CONFIG.env;
      process.env.LOG_LEVEL = MOCK_CONFIG.logLevel;
      process.env.NEW_RELIC_KEY = MOCK_CONFIG.newRelicKey;
      process.env.AUTH_PROVIDER = MOCK_CONFIG.auth.authProvider;
      process.env.AUTH0_JWKS_URL = MOCK_CONFIG.auth.jwksuri;
      process.env.AUTH0_TOKEN_ISSUER_URL = MOCK_CONFIG.auth.tokenIssuer;
      process.env.AZURE_SEARCH_LOG_STORAGE_CONNECTION_STRING =
        MOCK_CONFIG.azure.searchLogUpload.connectionString;
      process.env.AZURE_SEARCH_LOG_STORAGE_CONTAINER_NAME =
        MOCK_CONFIG.azure.searchLogUpload.containerName;
      process.env.AZURE_LOGO_STORAGE_CONNECTION_STRING =
        MOCK_CONFIG.azure.logoUpload.connectionString;
      process.env.AZURE_LOGO_STORAGE_CONTAINER_NAME =
        MOCK_CONFIG.azure.logoUpload.containerName;
      process.env.BOUNCER_BASE_URL = MOCK_CONFIG.authorization.baseUrl;
      process.env.BOUNCER_SERVICE_CLIENT_TOKEN =
        MOCK_CONFIG.authorization.serviceClientToken;
      process.env.PLATFORM_API_SERVICE_ACTIONS_URL =
        MOCK_CONFIG.platformApis.baseUrl;
      process.env.PLATFORM_API_SERVICE_ACTIONS_TOKEN =
        MOCK_CONFIG.platformApis.token;

      config.loadFromEnv();
      chai.expect(config.get()).to.deep.equal({
        ...DEFAULT_CONFIG,
        db: {
          ...DEFAULT_CONFIG.db,
        },
        env: MOCK_CONFIG.env,
        logLevel: MOCK_CONFIG.logLevel,
        newRelicKey: MOCK_CONFIG.newRelicKey,
      } as ConfigData);
    });

    it('should load database config properties from environment', () => {
      process.env.DATABASE_URL = MOCK_DB_CONFIG.url;

      config.loadFromEnv();
      chai.expect(config.get().db).to.deep.equal(MOCK_DB_CONFIG);
    });
  });
});
