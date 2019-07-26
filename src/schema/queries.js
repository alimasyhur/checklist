const { GraphQLObjectType } = require('graphql')
const templateQueries = require('../model/template/queries')
const checklistQueries = require('../model/checklist/queries')
const itemQueries = require('../model/item/queries')
const historyQueries = require('../model/history/queries')

module.exports = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        template: templateQueries.template,
        templates: templateQueries.templates,
        checklist: checklistQueries.checklist,
        checklists: checklistQueries.checklists,
        item: itemQueries.item,
        items: itemQueries.items,
        history: historyQueries.history,
        histories: historyQueries.histories
    }
})
