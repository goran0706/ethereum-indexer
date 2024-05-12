import { HexString } from "../types/HexString";
import { ResponseData } from "../types/ResponseData";
import apiClient from "./client";

export const getWallets = async (): Promise<HexString[]> => {
  const response = await apiClient.get<ResponseData>(`/wallets/`);
  return response.data.data;
};
