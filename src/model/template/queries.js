const { GraphQLList,
        GraphQLID,
        GraphQLString,
        GraphQLFloat } = require('graphql')
const type = require('./type')
const mutation = require('./mutations')
const Template = require("./template")

// Defines the queries
module.exports = {
    templates: {
        type: new GraphQLList(type),
        args: {
            name: {
                type: GraphQLString
            }
        },
        resolve: Template.findMatching.bind(Template)
    },
    template: {
        type,
        args: {
            id: {
                type: GraphQLID
            }
        },
        resolve: Template.getByID.bind(Template)
    }
}
