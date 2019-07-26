const { GraphQLObjectType } = require('graphql')
const templateMutation = require('../model/template/mutations')
const checklistMutation = require('../model/checklist/mutations')
const itemMutation = require('../model/item/mutations')

module.exports = new GraphQLObjectType({
    name: 'RootMutationsType',
    fields: {
        addTemplate: templateMutation.addTemplate,
        updateTemplate: templateMutation.updateTemplate,
        addChecklist: checklistMutation.addChecklist,
        updateChecklist: checklistMutation.updateChecklist,
        deleteChecklist: checklistMutation.deleteChecklist,
        addItem: itemMutation.addItem,
        updateItem: itemMutation.updateItem,
        deleteItem: itemMutation.deleteItem
    }
})
