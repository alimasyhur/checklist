let {
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')

// Defines the type
module.exports = new GraphQLObjectType({
    name: 'Item',
    description: 'A Item',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        description:   { type: GraphQLString || null },
        is_completed:   { type: GraphQLBoolean || null},
        urgency:   { type: GraphQLInt || null },
        checklist_id:   { type: GraphQLInt || null },
        user_id:   { type: GraphQLInt || null },
        due:   { type: GraphQLString  || null },
        due_interval:   { type: GraphQLString || null },
        due_unit:   { type: GraphQLString || null },
        completed_at:   { type: GraphQLString || null },
        updated_by:   { type: GraphQLString || null },
        created_at:   { type: GraphQLString || null },
        updated_at:   { type: GraphQLString || null }
    }
})
