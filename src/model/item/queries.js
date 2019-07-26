const { GraphQLList,
        GraphQLID,
        GraphQLString,
        GraphQLInt,
        GraphQLBoolean,
        GraphQLFloat } = require('graphql')
const type = require('./type')
const mutation = require('./mutations')
const Item = require("./item")

// Defines the queries
module.exports = {
    items: {
        type: new GraphQLList(type),
        args: {
              id: { type: GraphQLID },
              description:   { type: GraphQLString },
              is_completed:   { type: GraphQLBoolean },
              urgency:   { type: GraphQLInt },
              checklist_id:   { type: GraphQLInt },
              user_id:   { type: GraphQLInt },
              due:   { type: GraphQLString },
              due_interval:   { type: GraphQLString },
              due_unit:   { type: GraphQLString },
              completed_at:   { type: GraphQLString },
              updated_by:   { type: GraphQLString },
              created_at:   { type: GraphQLString },
              updated_at:   { type: GraphQLString }
        },
        resolve: Item.findMatching.bind(Item)
    },
    item: {
        type,
        args: {
          id: { type: GraphQLID },
          description:   { type: GraphQLString },
          is_completed:   { type: GraphQLBoolean },
          urgency:   { type: GraphQLInt },
          checklist_id:   { type: GraphQLInt },
          user_id:   { type: GraphQLInt },
          due:   { type: GraphQLString },
          due_interval:   { type: GraphQLString },
          due_unit:   { type: GraphQLString },
          completed_at:   { type: GraphQLString },
          updated_by:   { type: GraphQLString },
          created_at:   { type: GraphQLString },
          updated_at:   { type: GraphQLString }
        },
        resolve: Item.getByID.bind(Item)
    }
}
