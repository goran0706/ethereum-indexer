import { HexString } from "./HexString";

export interface BalanceType {
  key: string;
  wallet_address: HexString;
  token_address: HexString;
  token_balance: string | number;
  token_value_usd: string | number;
  block_number: string | number;
  timestamp: string | number;
}
