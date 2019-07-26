const { GraphQLList,
        GraphQLID,
        GraphQLString,
        GraphQLInt,
        GraphQLBoolean,
        GraphQLFloat } = require('graphql')
const type = require('./type')
const History = require("./history")

// Defines the queries
module.exports = {
    histories: {
        type: new GraphQLList(type),
        args: {
              id: { type: GraphQLID },
              loggable_type:   { type: GraphQLString },
              loggable_id:   { type: GraphQLString },
              action:   { type: GraphQLString },
              kwuid:   { type: GraphQLInt },
              value:   { type: GraphQLString },
              user_id:   { type: GraphQLInt },
              deleted_at:   { type: GraphQLString },
              created_at:   { type: GraphQLString },
              updated_at:   { type: GraphQLString }
        },
        resolve: History.findMatching.bind(History)
    },
    history: {
        type,
        args: {
              id: { type: GraphQLID },
              loggable_type:   { type: GraphQLString },
              loggable_id:   { type: GraphQLString },
              action:   { type: GraphQLString },
              kwuid:   { type: GraphQLInt },
              value:   { type: GraphQLString },
              user_id:   { type: GraphQLInt },
              deleted_at:   { type: GraphQLString },
              created_at:   { type: GraphQLString },
              updated_at:   { type: GraphQLString }
        },
        resolve: History.getByID.bind(History)
    }
}
