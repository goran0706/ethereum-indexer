import { HexString } from "../types/HexString";
import { ResponseData } from "../types/ResponseData";
import apiClient from "./client";

export const getTokens = async (): Promise<HexString[]> => {
  const response = await apiClient.get<ResponseData>(`/tokens/`);
  return response.data.data;
};
