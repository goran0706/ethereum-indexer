import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Express } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config";
import { startIndexing } from "./indexer/indexer";
import { initializeIndexer } from "./indexer/indexerJob";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { redirectMiddleware } from "./middlewares/redirectMiddleware";
import tokenRoutes from "./routes/token.routes";
import walletRoutes from "./routes/wallet.routes";

const initializeMiddlewares = (app: Express) => {
  app.use(redirectMiddleware);
  app.use(helmet());
  app.use(rateLimit(config.rateLimitOpts));
  app.use(morgan("dev"));
  app.use(compression());
  app.use(cors(config.crossOriginOpts));
  app.use(express.urlencoded({ limit: "5MB", extended: true }));
  app.use(express.json());
  app.use(express.text());
  app.use(express.raw());
  app.use(cookieParser());
  app.use(express.static(`${__dirname}/public`));
};

const initializeRoutes = (app: Express) => {
  app.use("/api", tokenRoutes);
  app.use("/api", walletRoutes);
};

const initializeErrorHandling = (app: Express) => {
  app.use(errorMiddleware);
};

const initializeJobs = () => {
  initializeIndexer();
};

const setupExpressApp = (): Express => {
  const app: Express = express();
  initializeMiddlewares(app);
  initializeRoutes(app);
  initializeErrorHandling(app);
  // initializeJobs();
  startIndexing();

  return app;
};

export default setupExpressApp();
