const { GraphQLList,
        GraphQLID,
        GraphQLString,
        GraphQLInt,
        GraphQLBoolean,
        GraphQLFloat } = require('graphql')
const type = require('./type')
const mutation = require('./mutations')

const Checklist = require("./checklist")

// Defines the queries
module.exports = {
    checklists: {
        type: new GraphQLList(type),
        args: {
              id: { type: GraphQLID },
              object_domain: { type: GraphQLString },
              object_id: { type: GraphQLString },
              description:   { type: GraphQLString },
              is_completed:   { type: GraphQLBoolean },
              urgency:   { type: GraphQLInt },
              due:   { type: GraphQLString },
              due_interval:   { type: GraphQLString },
              due_unit:   { type: GraphQLString },
              completed_at:   { type: GraphQLString },
              updated_by:   { type: GraphQLString },
              created_at:   { type: GraphQLString },
              updated_at:   { type: GraphQLString }
        },
        resolve: Checklist.findMatching.bind(Checklist)
    },
    checklist: {
        type,
        args: {
            id: { type: GraphQLID },
            object_domain: { type: GraphQLString },
            object_id: { type: GraphQLString },
            description:   { type: GraphQLString },
            is_completed:   { type: GraphQLBoolean },
            urgency:   { type: GraphQLInt },
            due:   { type: GraphQLString },
            due_interval:   { type: GraphQLString },
            due_unit:   { type: GraphQLString },
            completed_at:   { type: GraphQLString },
            updated_by:   { type: GraphQLString },
            created_at:   { type: GraphQLString },
            updated_at:   { type: GraphQLString },
        },
        resolve: Checklist.getByID.bind(Checklist)
    }
}
