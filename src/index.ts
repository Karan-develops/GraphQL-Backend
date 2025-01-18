import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = 8000;

  app.use(express.json());

  const graphQServer = new ApolloServer({
    typeDefs: `
        type Query{
            hello:String
            helloName(name:String):String
        }
    `,
    resolvers: {
      Query: {
        hello: () => {
          return "Hello There!";
        },
        helloName: (_, { name }: { name: String }) => {
          return `Hello, ${name}, How are doing.`;
        },
      },
    },
  });

  await graphQServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "Everything is good!" });
  });

  app.use("/graphql", expressMiddleware(graphQServer));

  app.listen(PORT, () => {
    console.log(`Server is running at port:${PORT}`);
  });
}

init();
