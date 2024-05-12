import { getSquelFlavour, query } from "../libs/query";
import { ResponseData } from "../types/ResponseData";

const sql = getSquelFlavour("postgres");

const getTokens = async (): Promise<ResponseData> => {
  const selectQuery = sql
    .select()
    .field("token_address")
    .from("tokens")
    .toString();

  const result = await query(selectQuery);
  const tokenAddresses = result.rows.map((row) => row.token_address);

  return {
    response: true,
    message: "success",
    data: tokenAddresses,
  };
};

export default { getTokens };
