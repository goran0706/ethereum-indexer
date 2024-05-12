import http from "http";
import https from "https";
import app from "./app";
import { tryDatabaseConnection } from "./libs/query";
import {
  getServerConfig,
  logServerStartFailure,
  logServerStartSuccess,
  readCredentials,
} from "./libs/utils";

const startServer = async (server: http.Server | https.Server) => {
  try {
    await tryDatabaseConnection();
    const { protocol, host, port } = getServerConfig(server);
    server.listen(port, () => logServerStartSuccess(protocol, host, port));
  } catch (error: unknown) {
    logServerStartFailure(error);
  }
};

const startHttpServer = async () => {
  const httpServer = http.createServer(app);
  await startServer(httpServer);
};

const startHttpsServer = async () => {
  const httpsServer = https.createServer(readCredentials(), app);
  await startServer(httpsServer);
};

startHttpServer();
startHttpsServer();
