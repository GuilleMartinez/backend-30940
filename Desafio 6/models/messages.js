const { readFile, writeFile } = require("fs").promises;

class Messages {
    constructor(dbName) {
        this.db = `./db/${dbName}.json`;
    }

    async get() {
        try {
            return JSON.parse(await readFile(this.db, "utf-8"));
        } catch {
            return [];
        }
    }

    async write(data) {
        const entry = { id: Date.now(), ...data };
        const messages = await this.get();
        messages.push(entry);
        await writeFile(this.db, JSON.stringify(messages, null, "\t"), "utf-8");
        return entry;
    }

}

module.exports = new Messages("messages");