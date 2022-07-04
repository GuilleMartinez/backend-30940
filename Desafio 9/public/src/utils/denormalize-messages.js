const denormalizeMessages = (chat) => {
    const { schema, denormalize } = normalizr;
    const author = new schema.Entity("authors", {}, { idAttribute: "email" });
    const message = new schema.Entity("messages", { author });
    const messages = new schema.Entity("chat", { messages: [message] });

    return "entities" in chat
        ? denormalize(chat.result, messages, chat.entities)
        : chat;
};

export default denormalizeMessages;
