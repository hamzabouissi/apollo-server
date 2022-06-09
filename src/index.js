const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");

const server = new ApolloServer({ typeDefs, resolvers: resolvers });

mongoose
  .connect("mongodb://storeuser:storepassword@127.0.0.1:27017/storedb?authSource=admin&retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to a MongoDB instance");
    return server.listen();
  })
  .then(() => {
    console.log(`
      🚀  Server is running!
      🔉  Listening on port 4000
      📭  Query at https://studio.apollographql.com/dev
    `);
  });

// server.listen().then(() => {
//   console.log(`
//       🚀  Server is running!
//       🔉  Listening on port 4000
//       📭  Query at https://studio.apollographql.com/dev
//     `);
// });
