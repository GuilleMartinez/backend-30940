"use strict";
const fs = require("fs").promises;

class Container {
  
  constructor(fileName) {
    this.file = fileName;
  }

  async getAll() {
    try {
      const fileContent = await fs.readFile(this.file, "utf-8");
      return JSON.parse(fileContent);
    } catch (err) {
      return [];
    }
  }

  async save(item) {
    try {
      this.#validateItem(item);
      const fileContent = await this.getAll();
      let idFromLastItem = fileContent.slice(-1)[0]?.id || 0;
      fileContent.push({ id: ++idFromLastItem, ...item });
      await fs.writeFile(
        this.file,
        JSON.stringify(fileContent, null, "\t"),
        "utf-8"
      );
      console.info("Product succesfully added.");
      return idFromLastItem;
    } catch (err) {
      console.error(`Error on save: ${err.message}.`);
      return -1;
    }
  }

  async getById(id) {
    try {
      if (typeof id != "number") throw Error("ID must be a number");
      const fileContent = await this.getAll();
      const searchedItem = fileContent.find((item) => item.id == id);
      if (!searchedItem) throw Error("Item not found");
      return searchedItem;
    } catch (err) {
      console.error(`Error getting item: ${err.message}.`);
      return null;
    }
  }

  async deleteById(id) {
    try {
      if (typeof id != "number") throw Error("ID must be a number");
      const fileContent = await this.getAll();
      if (fileContent.some((item) => item.id == id)) {
        const filteredContent = fileContent.filter((item) => item.id != id);
        await fs.writeFile(
          this.file,
          JSON.stringify(filteredContent, null, "\t"),
          "utf-8"
        );
        console.info("Product succesfully deleted.");
      } else {
        throw Error("Item not found");
      }
    } catch (err) {
      console.error(`Error deleting item: ${err.message}.`);
    }
  }

  async deleteAll() {
    await fs.writeFile(this.file, JSON.stringify([]), "utf-8");
    console.info("Products succesfully deleted.");
  }

  #validateItem(item) {
    const requiredKeys = ["title", "price", "thumbnail"];
    const requiredTypes = ["string", "number", "string"];
    const itemKeys = Object.keys(item);

    if (
      itemKeys.length != requiredKeys.length ||
      !itemKeys.every((key) => requiredKeys.includes(key))
    ) {
      throw Error("Object must contain 'product', 'title' and 'thumbnail'");
    } else if (
      !requiredKeys.every(
        (key, index) => typeof item[key] == requiredTypes[index] && item[key]
      )
    ) {
      throw Error("Object have invalid data type or incomplete data");
    }
  }
}

module.exports = Container;