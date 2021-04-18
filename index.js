const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const express = require('express');

const server = express();

// Get the Mongoose models used for querying the database.
const { User } = require('./models');

// Start up a GraphQL endpoint listening at /graphql.
server.use(
  '/graphql',
  graphqlHTTP({
    /**
     * We construct our GraphQL schema which has two types:
     * - the User type
     * - the Query type, through which all queries for data are defined
     */
    schema: buildSchema(`
      type User {
        _id: String
        username: String
        name: String
      }

      type Query {
        user(id: String!): User
      }
    `),
    // The methods that we'll use to get the data for our main queries.
    rootValue: {
      // Get a user based on the ID and return it as a Promise
      user({ id }) {
        return User.findById(id);
      },
    },
    // Display the GraphiQL web interface (for easy usage).
    graphiql: true,
  })
);

// Start the server, listening on port 3000.
server.listen(3000);
