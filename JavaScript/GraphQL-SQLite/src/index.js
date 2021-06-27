// BASIC CONFIG
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const path = require("path");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { findBreakingChanges } = require("graphql");

const tasks = [
  { id: 1, title: "blabla", parent: 2 },
  { id: 2, title: "hahaha", parent: 1 },
];

// CONNECTING TO DB

const dbPath = path.resolve(__dirname, "../db/ex5.db");

const db = open({
  filename: dbPath,
  driver: sqlite3.Database,
});

// DECLARING RESOLVERS

const resolvers = {
  Task: {
    parent: async (root) => {
      const parent = await (
        await db
      ).get(`SELECT * FROM ex5 WHERE id = ${root.id}`);
      return parent;
    },
  },

  Query: {
    task: async (_, args) => {
      if (args.id) {
        //const taskToReturn = tasks.find( t => t.id === args.id )
        const taskToReturn = await (
          await db
        ).get(`SELECT * FROM ex5 WHERE id = ${args.id}`);
        return [taskToReturn];
      } else if (!args.id) {
        const tasks = await (await db).all("SELECT * FROM ex5");
        return tasks;
      } else throw new Error("coś nie pykło");
    },
  },
  Mutation: {
    createTask: async (_, args) => {
      const { title, parentId } = args;
      const newInsert = await (
        await db
      ).run(`INSERT INTO ex5 (title, parent) VALUES (? , ?)`, [
        title,
        parentId,
      ]);
      return newInsert.lastID;
    },
  },
};

// SET UP APOLLO SERVER

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// LAUNCHING THE SERVER

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
