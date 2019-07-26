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

var itemType = require('../item/type');
const Item = require("../item/item")

module.exports = new GraphQLObjectType({
    name: 'Checklist',
    description: 'A Checklist',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        object_domain:   { type: new GraphQLNonNull(GraphQLString) },
        object_id:   { type: new GraphQLNonNull(GraphQLString) },
        description:   { type: GraphQLString || null },
        is_completed:   { type: GraphQLBoolean || null},
        urgency:   { type: GraphQLInt || null },
        due:   { type: GraphQLString  || null },
        due_interval:   { type: GraphQLString || null },
        due_unit:   { type: GraphQLString || null },
        completed_at:   { type: GraphQLString || null },
        updated_by:   { type: GraphQLString || null },
        created_at:   { type: GraphQLString || null },
        updated_at:   { type: GraphQLString || null },
        items: {
                  type: new GraphQLList(itemType),
                  resolve: Item.findMatching.bind(Item)
                }
    }
})
