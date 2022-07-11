module.exports = {
  port: 8080,
  mongo: {
    uri: "mongodb+srv://coderAlumno:coderhouse@cluster0.vujixen.mongodb.net/?retryWrites=true&w=majority",
    productsCollection: "products",
    messagesCollection: "messages",
    usersCollecion: "users",
    sessionCollection: "sessions"
  },
};
