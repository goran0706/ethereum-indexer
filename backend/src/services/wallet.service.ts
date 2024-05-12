import { HexString } from "ethers/lib.commonjs/utils/data";
import { getSquelFlavour, query } from "../libs/query";
import { ResponseData } from "../types/ResponseData";

const sql = getSquelFlavour("postgres");

const getWallets = async (): Promise<ResponseData> => {
  const selectQuery = sql
    .select()
    .field("wallet_address")
    .from("wallets")
    .toString();

  const result = await query(selectQuery);
  const walletAddresses = result.rows.map((row) => row.wallet_address);

  return {
    response: true,
    message: "success",
    data: walletAddresses,
  };
};

const getBalance = async (
  wallet_address: HexString,
  token_address: HexString
): Promise<ResponseData> => {
  const selectQuery = sql
    .select()
    .field("token_address")
    .field("token_balance")
    .from("balances") // todo: balance table
    .where("wallet_address = ?", wallet_address)
    .where("token_address = ?", token_address)
    .order("block_number", false)
    .limit(1)
    .toString();

  const result = await query(selectQuery);
  const balance = result.rows[0];

  return {
    response: true,
    message: "success",
    data: balance,
  };
};

const getPrice = async (
  wallet_address: HexString,
  token_address: HexString
): Promise<ResponseData> => {
  const selectQuery = sql
    .select()
    .field("token_address")
    .field("token_value_usd")
    .from("balances") // todo: balance table
    .where("wallet_address = ?", wallet_address)
    .where("token_address = ?", token_address)
    .order("block_number", false)
    .limit(1)
    .toString();

  const result = await query(selectQuery);
  const price = result.rows[0];

  return { response: true, message: "success", data: price };
};

const getHistoricalBalances = async (
  wallet_address: HexString
): Promise<ResponseData> => {
  const selectQuery = sql
    .select()
    .field("wallet_address")
    .field("token_address")
    .field("token_balance")
    .field("token_value_usd")
    .field("block_number")
    .field("timestamp")
    .from("balances")
    .where("wallet_address = ?", wallet_address)
    .toString();

  const result = await query(selectQuery);
  const historicalBalances = result.rows;

  return {
    response: true,
    message: "success",
    data: historicalBalances,
  };
};

const getHistoricalBalancesPerToken = async (
  wallet_address: HexString,
  token_address: HexString
): Promise<ResponseData> => {
  const selectQuery = sql
    .select()
    .field("wallet_address")
    .field("token_address")
    .field("token_balance")
    .field("token_value_usd")
    .field("block_number")
    .field("timestamp")
    .from("balances")
    .where("wallet_address = ?", wallet_address)
    .where("token_address = ?", token_address)
    .toString();

  const result = await query(selectQuery);
  const historicalBalances = result.rows;

  return {
    response: true,
    message: "success",
    data: historicalBalances,
  };
};

const upsertTokenBalance = async (
  walletAddress: HexString,
  tokenAddress: HexString,
  tokenBalance: bigint,
  tokenValueUsd: number,
  blockNumber: number,
  timestamp?: string
) => {
  // const insertQuery = `
  //   INSERT INTO public.balances(wallet_address, token_address, token_balance, token_value_usd, block_number, "timestamp")
  //   VALUES ($1, $2, $3, $4, $5, $6);
  // `;

  const upsertQuery = `
    INSERT INTO public.balances(wallet_address, token_address, token_balance, token_value_usd, block_number, "timestamp")
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (wallet_address, token_address, block_number)
    DO UPDATE SET
      token_balance = EXCLUDED.token_balance,
      token_value_usd = EXCLUDED.token_value_usd,
      "timestamp" = EXCLUDED."timestamp";
  `;

  await query(upsertQuery, [
    walletAddress,
    tokenAddress,
    tokenBalance,
    tokenValueUsd,
    blockNumber,
    timestamp,
  ]);
};

export default {
  getWallets,
  getBalance,
  getPrice,
  getHistoricalBalances,
  getHistoricalBalancesPerToken,
  upsertTokenBalance,
};
