import { Pool, QueryResult } from "pg";
import squel, { MssqlSquel, MysqlSquel, PostgresSquel } from "squel";
import { config } from "../config";
import { MSG } from "./logMessages";

const pool = new Pool(config.databaseOpts);

export const query = async (
  queryString: string,
  params?: any[]
): Promise<QueryResult<any>> => {
  return await pool.query(queryString, params);
};

export const tryDatabaseConnection = async (): Promise<QueryResult<any>> => {
  const result = await query("SELECT NOW();");
  console.log(MSG.SUCCESS_DB_CONNECTION());
  return result;
};

export const getSquelFlavour = (
  flavour: "mssql" | "mysql" | "postgres"
): MssqlSquel | MysqlSquel | PostgresSquel => {
  switch (flavour) {
    case "mssql":
      return squel.useFlavour(flavour as "mssql");
    case "mysql":
      return squel.useFlavour(flavour as "mysql");
    case "postgres":
      return squel.useFlavour(flavour as "postgres");
    default:
      throw new Error(`Unsupported flavour: ${flavour}`);
  }
};
