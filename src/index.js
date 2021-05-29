const { ApolloServer } = require("apollo-server");
const express = require("express");
// const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
//

const { makeExecutableSchema } = require("graphql-tools");

const { Query, Student } = require("./resolvers/student");

const app = express();

const Port = 9000;

// const typeDefinition = `
// 	type Query {
// 		greetings: String
// 	}
// `;

// const resolver = {
// 	Query: {
// 		greetings: () => "Hello first grapql",
// 	},
// };

const schema = makeExecutableSchema({
	typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
	resolvers: Query

})

const server = new ApolloServer({
	schema: schema,

});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));

// app.listen(Port, () => {
// 	console.log(`server is running on ${Port}`);
// });

// const prisma = new PrismaClient();

// // const typeDefs = `
// //   type Query {
// //     info: String!
// //   }
// // `;

// // 2
// const resolvers = {
// 	Query: {
// 		info: () => `This is the API of a Hackernews Clone`,
// 		feed: async (parents, args, context) => {
// 			return context.prisma.link.findmany();
// 		},
// 	},

// 	Mutation: {
// 		post: (parent, args, context, info) => {
// 			const newLink = context.prisma.link.create({
// 				data: {
// 					url: args.url,
// 					description: args.description,
// 				},
// 			});
// 			return newLink;
// 		},
// 	},
// };

// // 3
// const server = new ApolloServer({
// 	typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
// 	resolvers,
// 	context: {
// 		prisma,
// 	},
// });

// server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
