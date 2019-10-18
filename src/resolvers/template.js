import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';
import GraphQLJSON from 'graphql-type-json';
import { isAuthenticated, isTemplateOwner } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
    Buffer.from(string, 'base64').toString('ascii');

export default {
    Query: {
        templates: combineResolvers(
            isAuthenticated,
            async (parent, { cursor, limit = 100 }, { models, me }) => {
                const cursorOptions = cursor
                    ? {
                        where: {
                            createdAt: {
                                [Sequelize.Op.lt]: fromCursorHash(cursor),
                            },
                        },
                    }
                    : {
                        where: {
                            userId: me.id
                        }
                    };

                const templates = await models.Template.findAll({
                    order: [['createdAt', 'DESC']],
                    limit: limit + 1,
                    ...cursorOptions,
                });

                const hasNextPage = templates.length > limit;
                const edges = hasNextPage ? templates.slice(0, -1) : templates;

                return {
                    edges,
                    pageInfo: {
                        hasNextPage,
                        endCursor: toCursorHash(
                            edges[edges.length - 1].createdAt.toString(),
                        ),
                    },
                };
            }
        ),
        template: combineResolvers(
            isAuthenticated,
            isTemplateOwner,
            async (parent, { id }, { models }) => {
                return await models.Template.findByPk(id);
            }
        ),
    },

    Mutation: {
        createTemplate: combineResolvers(
            isAuthenticated,
            async (parent, { name, checklist, items }, { models, me }) => {
                const checklistInput = JSON.stringify(checklist)
                const itemsInput = JSON.stringify(items)

                return await models.sequelize.transaction(async function (t) {
                    const template = await models.Template.create({
                        name,
                        checklist: checklistInput,
                        items: itemsInput,
                        userId: me.id,
                    }, { transaction: t });

                    await models.History.create({
                        loggable_id: template.id,
                        loggable_type: "templates",
                        action: "create",
                        value: JSON.stringify(template),
                        kwuid: me.id,
                        userId: me.id
                    }, { transaction: t });

                    return template
                });
            },
        ),

        updateTemplate: combineResolvers(
            isAuthenticated,
            isTemplateOwner,
            async (parent, { id, name, checklist, items }, { models, me }) => {
                return await models.sequelize.transaction(async function (t) {
                    const template = await models.Template.findByPk(id)
                    template.update({
                        name,
                        checklist,
                        items
                    }, { transaction: t });

                    await models.History.create({
                        loggable_id: template.id,
                        loggable_type: "templates",
                        action: "update",
                        value: JSON.stringify(template),
                        kwuid: me.id,
                        userId: me.id
                    }, { transaction: t });

                    return template
                });
            },
        ),

        assignTemplate: combineResolvers(
            isAuthenticated,
            async (parent, { id, object_id, object_domain }, { models, me }) => {
                const template = await models.Template.findByPk(id)
                return await models.sequelize.transaction(async function (t) {
                    const checklistObj = JSON.parse(template.checklist)

                    const itemsObj = JSON.parse(template.items)
                    itemsObj.forEach(function (item) { item.userId = me.id })

                    checklistObj.object_id = object_id
                    checklistObj.object_domain = object_domain
                    checklistObj.userId = me.id
                    checklistObj.templateId = template.id
                    checklistObj.items = itemsObj

                    const checklist = await models.Checklist.create(checklistObj,
                        { include: [models.Item] },
                        { transaction: t })

                    await models.History.create({
                        loggable_id: template.id,
                        loggable_type: "templates",
                        action: "assign",
                        value: JSON.stringify(template),
                        kwuid: me.id,
                        userId: me.id
                    }, { transaction: t });


                    return checklist
                });
            },
        ),

        assignMultiTemplate: combineResolvers(
            isAuthenticated,
            async (parent, { id, data }, { models, me }) => {
                const template = await models.Template.findByPk(id)
                await models.sequelize.transaction(async function (t) {
                    data.forEach(function (checklistData) {

                        const checklistObj = JSON.parse(template.checklist)

                        const itemsObj = JSON.parse(template.items)
                        itemsObj.forEach(function (item) { item.userId = me.id })
                        //
                        checklistObj.object_id = checklistData.object_id
                        checklistObj.object_domain = checklistData.object_domain
                        checklistObj.userId = me.id
                        checklistObj.templateId = template.id
                        checklistObj.items = itemsObj

                        models.Checklist.create(checklistObj,
                            { include: [models.Item] },
                            { transaction: t })

                    })

                    await models.History.create({
                        loggable_id: template.id,
                        loggable_type: "templates",
                        action: "assign-bulk",
                        value: JSON.stringify(data),
                        kwuid: me.id,
                        userId: me.id
                    }, { transaction: t });

                    console.log(id)
                    console.log(me.id)
                });

                return models.Checklist.findAll({ where: { templateId: id, userId: me.id } })
            },
        ),

        deleteTemplate: combineResolvers(
            isAuthenticated,
            isTemplateOwner,
            async (parent, { id }, { models, me }) => {
                try {
                    await models.sequelize.transaction(async function (t) {
                        const template = await models.Template.findByPk(id)

                        await models.History.create({
                            loggable_id: template.id,
                            loggable_type: "templates",
                            action: "destroy",
                            value: JSON.stringify(template),
                            kwuid: me.id,
                            userId: me.id
                        }, { transaction: t });

                        return template.destroy({ where: { id: id } }, { transaction: t });
                    });

                    return true
                } catch (err) {
                    throw formatError(err)
                }
            },
        ),
    },

    JSON: {
        __serialize(value) {
            var obj = JSON.parse(value)
            return obj
        }
    },

    Template: {
        user: async (template, args, { models }) => {
            return await models.User.findByPk(template.userId);
        },
    },
};
