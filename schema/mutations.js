const { GraphQLObjectType } = require('graphql')
const checklistMutation = require('../models/Checklist/mutations')

module.exports = new GraphQLObjectType({
    name: 'RootMutationsType',
    fields: {
      addChecklist: checklistMutation.addChecklist
    }
})
