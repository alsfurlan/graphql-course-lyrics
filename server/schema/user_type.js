const graphql = require('graphql');
const { GraphQLID, GraphQLString, GraphQLObjectType } = graphql;

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

module.exports = UserType;
