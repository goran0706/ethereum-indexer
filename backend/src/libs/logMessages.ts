import { HexString } from "ethers/lib.commonjs/utils/data";
import { extractErrorMessage } from "./utils";

export const MSG = {
  ERROR: function (error: Error) {
    return `[Error]: ${error}`;
  },
  ERROR_ADDRESS_NOT_FOUND: function (type: string) {
    return `No ${type} addresses found. Skipping...`;
  },
  ERROR_INVALID_ADDRESS: function (address: HexString) {
    return `Invalid checksum address: ${address}. Skipping...`;
  },
  ERROR_NO_EVENTS_FOUND: function () {
    return `No events found. Skipping...`;
  },
  ERROR_EVENT_NOT_FOUND: function () {
    return `No events found. Skipping...`;
  },
  ERROR_INDEXING: function (error: unknown) {
    return `💥Indexing failure. [Error]: ${extractErrorMessage(error)}`;
  },
  ERROR_DB_CONNECTION: function (error: unknown) {
    return `💥Database failure. [Error]: ${extractErrorMessage(error)}`;
  },
  ERROR_SERVER_START: function (error: unknown) {
    return `💥Server failed to start. [Error]: ${extractErrorMessage(error)}`;
  },
  SUCCESS_DB_CONNECTION: function () {
    return `🚀Database connection established successfully`;
  },
  SUCCESS_SERVER_START: function (
    protocol: string,
    host: string,
    port: string | number
  ) {
    return `🚀${protocol.toUpperCase()} server running on ${host}:${port} \n`;
  },
  START_INDEXING: function () {
    return `🚀Indexing started successfully`;
  },
  SKIPPING_IRRELEVANT_EVENTS: function (address: HexString) {
    return `Skipping irrelevant events for address ${address}.`;
  },
  INSERTING_INDEXED_DATA: function (
    walletAddress: HexString,
    tokenAddress: HexString,
    tokenBalance: bigint,
    tokenValueUsd: number,
    blockNumber: number,
    timestamp: string
  ) {
    return `Inserting data: ${walletAddress} | ${tokenAddress} | ${tokenBalance} | ${tokenValueUsd} | ${blockNumber} | ${timestamp}`;
  },
};
