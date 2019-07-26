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
const Item = require('./item')

// Defines the mutations
module.exports = {
    addItem: {
        type,
        args: {
            description:   { type: new GraphQLNonNull(GraphQLString) },
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
        resolve: Item.createEntry.bind(Item)
    },
    updateItem: {
        type,
        args: {
            id:     { type: GraphQLID },
            description:   { type: new GraphQLNonNull(GraphQLString) },
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
        resolve: Item.updateEntry.bind(Item)
    },
    deleteItem: {
        type: GraphQLString,
        args: {
            id:     { type: GraphQLID },
            description:   { type: new GraphQLNonNull(GraphQLString) },
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
        resolve: Item.deleteEntry.bind(Item)
    }
}
