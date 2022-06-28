const denormalizeMessages = ({ result, entities }) => {
    const { schema, denormalize } = normalizr;

    const author = new schema.Entity("authors", {}, { idAttribute: "email" });
    const message = new schema.Entity("messages", { author });
    const messages = new schema.Entity("chat", { messages: [message] });

    return denormalize(result, messages, entities);
};

export default denormalizeMessages;
