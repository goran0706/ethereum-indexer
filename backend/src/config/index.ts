export const config = {
  environment: process.env.NODE_ENV || "development",
  serverOpts: {
    host: process.env.SERVER_HOST || "0.0.0.0",
    httpPort: process.env.SERVER_HTTP_PORT || 8000,
    httpsPort: process.env.SERVER_HTTPS_PORT || 8443,
    useSsl: Boolean(process.env.SERVER_USE_SSL),
  },
  certificatePaths: {
    privateKeyPath: `${process.cwd()}${process.env.PRIVATE_KEY_PATH}`,
    certificatePath: `${process.cwd()}${process.env.CERTIFICATE_PATH}`,
  },
  crossOriginOpts: {
    origin: process.env.ALLOWED_ORIGINS || "*",
    methods: "*",
    allowedHeaders: "*",
    optionsSuccessStatus: 204,
  },
  logs: {
    level: process.env.LOG_LEVEL || "info",
    directory: process.env.LOGS_DIR || `${process.cwd()}/logs`,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "825cb8c25cfdbbf313f65eea010b28",
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  },
  rateLimitOpts: {
    windowMs: 15 * 60 * 1000,
    limit: 10000000000000,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  },
  databaseOpts: {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    max: Number(process.env.DB_MAX_CONNECTIONS) || 20,
    idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS) || 30000,
    connectionTimeoutMillis: Number(process.env.DB_CONN_TIMEOUT_MS) || 2000,
  },
  web3: {
    rpcUrl: process.env.RPC_PROVIDER,
  },
} as const;

export type Config = typeof config;
