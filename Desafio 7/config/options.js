module.exports = {
  port: 8080,
  products: {
    table: "products",
    config: {
      client: "mysql",
      connection: {
        host: "localhost",
        port: 3306,
        database: "ecommerce",
        user: "root",
      },
      pool: { min: 2, max: 8 },
    },
  },
  messages: {
    table: "messages",
    config: {
      client: "sqlite3",
      connection: {
        filename: "./db/ecommerce.sqlite",
      },
      pool: { min: 2, max: 8 },
      useNullAsDefault: true,
    },
  },
};
