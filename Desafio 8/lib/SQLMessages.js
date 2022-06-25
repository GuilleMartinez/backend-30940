const SQLDatabase = require("./SQLDatabase");

class SQLMessages extends SQLDatabase {
  constructor(config, table, model) {
    super(config, table, model);
  }

  #formatMessage(message) {
    return { ...message, author: JSON.parse(message.author) };
  }

  async get() {
    const messages = await this.database(this.table).select();
    return { id: 1, messages: messages.map(this.#formatMessage) };
  }

  async findOne(id) {
    const [message] = await this.database(this.table).where({ id }).select();
    return message ? this.#formatMessage(message) : null;
  }
}

module.exports = SQLMessages;
