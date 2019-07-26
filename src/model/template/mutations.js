const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLFloat
} = require('graphql')
const type = require('./type')
const Template = require('./template')

// Defines the mutations
module.exports = {
    addTemplate: {
        type,
        args: {
            name:   { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: Template.createEntry.bind(Template)
    },
    updateTemplate: {
        type,
        args: {
            id:     { type: GraphQLID },
            name:   { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: Template.updateEntry.bind(Template)
    }
}
