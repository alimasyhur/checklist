const { GraphQLObjectType } = require('graphql')
const checklistQueries = require('../models/Checklist/queries')

module.exports = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      checklists: checklistQueries.checklists,
      checklist: checklistQueries.checklist
    }
})
