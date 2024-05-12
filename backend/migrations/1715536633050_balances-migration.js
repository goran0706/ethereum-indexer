exports.up = (pgm) => {
  pgm.createTable("balances", {
    id: "id",
    wallet_address: {
      type: "varchar(64)",
      length: 64,
      notNull: true,
    },
    token_address: {
      type: "varchar(64)",
      length: 64,
      notNull: true,
    },
    token_balance: {
      type: "numeric",
      // precision: 18,
      scale: 0,
      notNull: true,
      default: 0,
    },
    token_value_usd: {
      type: "numeric",
      scale: 0,
      notNull: true,
      default: 0,
    },
    block_number: {
      type: "integer",
      notNull: true,
      default: 0,
    },
    timestamp: {
      type: "timestamp with time zone",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("balances", "wallet_address", { method: "btree" });
  pgm.createIndex("balances", "token_address", { method: "btree" });
  pgm.createIndex("balances", "block_number", { method: "btree" });
  pgm.createIndex("balances", "timestamp", { method: "btree" });

  pgm.createIndex(
    "balances",
    ["wallet_address", "token_address", "block_number", "timestamp"],
    { method: "btree" }
  );

  pgm.createIndex(
    "balances",
    ["wallet_address", "token_address", "block_number"],
    { method: "btree", unique: true } // Create unique index for upsert constraint
  );
};
