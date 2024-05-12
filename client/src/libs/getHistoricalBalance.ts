import { BalanceType } from "../types/BalanceType";
import { HexString } from "../types/HexString";
import { ResponseData } from "../types/ResponseData";
import apiClient from "./client";

export const getHistoricalBalances = async (
  walletAddress: HexString
): Promise<BalanceType[]> => {
  const response = await apiClient.get<ResponseData>(
    `/wallets/${walletAddress}/historical_balances`
  );

  return response.data.data;
};

export const getHistoricalBalancesPerToken = async (
  walletAddress: HexString,
  tokenAddress: HexString
): Promise<number[]> => {
  const response = await apiClient.get<ResponseData>(
    `/wallets/${walletAddress}/token/${tokenAddress}/historical_balances`
  );

  return response.data.data;
};
