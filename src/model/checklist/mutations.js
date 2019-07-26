const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat
} = require('graphql')
const type = require('./type')
const Checklist = require('./checklist')

// Defines the mutations
module.exports = {
    addChecklist: {
        type,
        args: {
            object_domain:   { type: new GraphQLNonNull(GraphQLString) },
            object_id:   { type: new GraphQLNonNull(GraphQLString) },
            description:   { type: new GraphQLNonNull(GraphQLString) },
            is_completed:   { type: GraphQLBoolean },
            urgency:   { type: GraphQLInt },
            due:   { type: GraphQLString },
            due_interval:   { type: GraphQLString },
            due_unit:   { type: GraphQLString },
            created_at:   { type: GraphQLString },
            updated_at:   { type: GraphQLString }
        },
        resolve: Checklist.createEntry.bind(Checklist)
    },
    updateChecklist: {
        type,
        args: {
            id:     { type: GraphQLID },
            object_domain:   { type: GraphQLString },
            object_id:   { type: GraphQLString },
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
        resolve: Checklist.updateEntry.bind(Checklist)
    },
    deleteChecklist: {
        type: GraphQLString,
        args: {
            id:     { type: GraphQLID },
            object_domain:   { type: GraphQLString },
            object_id:   { type: GraphQLString },
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
        resolve: Checklist.deleteEntry.bind(Checklist)
    }
}
