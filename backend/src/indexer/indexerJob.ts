import cron from "node-cron";
import { startIndexing } from "./indexer";

export const initializeIndexer = () => {
  cron.schedule("*/5 * * * *", startIndexing);
};
