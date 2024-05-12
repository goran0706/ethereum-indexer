import { getAddress } from "ethers";
import { HexString } from "ethers/lib.commonjs/utils/data";
import fs from "fs";
import http from "http";
import https from "https";
import { config } from "../config";
import { Certificate } from "../types/Certificate";
import { MSG } from "./logMessages";

export const readCredentials = (): Certificate => {
  const { privateKeyPath, certificatePath } = config.certificatePaths;
  const privateKey = fs.readFileSync(privateKeyPath, "utf8");
  const certificate = fs.readFileSync(certificatePath, "utf8");
  return { key: privateKey, cert: certificate };
};

export const shouldRedirect = (protocol: string): boolean => {
  const { environment } = config;
  return environment === "production" && protocol === "http";
};

export const constructUrl = (
  protocol: string,
  host: string,
  port: string | number,
  endpoint: string
): string => {
  return `${protocol}://${host}:${port}${endpoint}`;
};

export const extractErrorMessage = (error: unknown): string => {
  let errorMessage = "Unknown error";
  if (typeof error === "string") {
    errorMessage = error;
  } else if (typeof error === "object") {
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = JSON.stringify(error);
    }
  }
  return errorMessage;
};

export const getServerConfig = (
  server: http.Server | https.Server
): {
  protocol: string;
  host: string;
  port: string | number;
} => {
  const { host, httpPort, httpsPort } = config.serverOpts;
  const isHttps = server instanceof https.Server;
  const protocol = isHttps ? "https" : "http";
  const port = isHttps ? httpsPort : httpPort;
  return { protocol, host, port };
};

export const logServerStartFailure = (error: unknown) => {
  const errorMessage = extractErrorMessage(error);
  console.log(MSG.ERROR_SERVER_START(error));
};

export const logServerStartSuccess = (
  protocol: string,
  host: string,
  port: string | number
) => {
  console.log(MSG.SUCCESS_SERVER_START(protocol, host, port));
};

// Function to check if an address is valid
export const isValidChecksumAddress = (address: HexString): boolean => {
  try {
    return getAddress(address) === address;
  } catch (error) {
    return false;
  }
};
