const { gql } = require("apollo-server");

const typeDefs = gql`
  type Task {
    id: Int!
    title: String!
    parent: Task
  }

  type Query {
    task(id: Int): [Task!]
  }

  type Mutation {
    createTask(title: String!, parentId: Int!): Int
  }
`;
module.exports = typeDefs;
