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
    name: 'History',
    description: 'A History',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        loggable_type:   { type: GraphQLString },
        loggable_id:   { type: GraphQLString },
        action:   { type: GraphQLString },
        kwuid:   { type: GraphQLInt || null },
        value:   { type: GraphQLString  || null },
        user_id:   { type: GraphQLInt || null },
        deleted_at:   { type: GraphQLString || null },
        created_at:   { type: GraphQLString || null },
        updated_at:   { type: GraphQLString || null }
    }
})
