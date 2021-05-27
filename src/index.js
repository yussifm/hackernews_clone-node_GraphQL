const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
//

const prisma = new PrismaClient();

const typeDefs = `
  type Query {
    info: String!
  }
`;

// 2
const resolvers = {
	Query: {
		info: () => `This is the API of a Hackernews Clone`,
		feed: async (parents, args, context) => {
			return context.prisma.link.findmany();
		},
	},

	Mutation: {
		post: (parent, args, context, info) => {
			const newLink = context.prisma.link.create({
				data: {
					url: args.url,
					description: args.description,
				},
			});
			return newLink;
		},
	},
};

// 3
const server = new ApolloServer({
	typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
	resolvers,
	context: {
		prisma,
	},
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
