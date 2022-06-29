module.exports = {
  port: 8080,
  sql: {
    config: {
      client: "sqlite3",
      connection: {
        filename: "./db/ecommerce.sqlite",
      },
      pool: { min: 2, max: 8 },
      useNullAsDefault: true,
    },
    productsTable: "products",
    messagesTable: "messages"
  },
};
