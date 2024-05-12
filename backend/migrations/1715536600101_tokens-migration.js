exports.up = (pgm) => {
  pgm.createTable("tokens", {
    id: "id",
    token_address: {
      type: "varchar(64)",
      length: 64,
      notNull: true,
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};
