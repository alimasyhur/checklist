import Sequelize from 'sequelize';
import { ForbiddenError } from 'apollo-server-express';
import { combineResolvers } from 'graphql-resolvers';
import GraphQLJSON from 'graphql-type-json';
import { isAuthenticated, isItemOwner } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    items: combineResolvers(
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

        const items = await models.Item.findAll({
          order: [['createdAt', 'DESC']],
          limit: limit + 1,
          ...cursorOptions,
        });

        const hasNextPage = items.length > limit;
        const edges = hasNextPage ? items.slice(0, -1) : items;

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
    item: combineResolvers(
      isAuthenticated,
      isItemOwner,
      async (parent, { id }, { models }) => {
        return await models.Item.findByPk(id);
      }
    ),
    checklistItem: combineResolvers(
      isAuthenticated,
      async (parent, { checklistId, itemId }, { models, me }) => {
        return await models.Item.findOne({
          where: {
            id: itemId,
            checklistId: checklistId,
            userId: me.id
          },
          include: [models.Checklist]
        });
      }
    ),
  },

  Mutation: {
    createChecklistItem: combineResolvers(
      isAuthenticated,
      async (parent, {  checklistId,
                        description,
                        is_completed,
                        due,
                        due_interval,
                        due_unit,
                        urgency
       }, { models, me }) => {

        return await models.sequelize.transaction(async function(t){
          const checklist = await models.Checklist.findByPk(checklistId)

          if(checklist) {
            const item = await models.Item.create({
              description,
              is_completed,
              due,
              due_interval,
              due_unit,
              urgency,
              userId: me.id,
              checklistId: checklist.id
            }, {transaction: t});

            await models.History.create({
              loggable_id: item.id,
              loggable_type: "items",
              action: "create",
              value: JSON.stringify(item),
              kwuid: me.id,
              userId: me.id
            }, {transaction: t});

            console.log(item)

            return item
          }else {
            throw new Error('Checklist not found!')
          }
        });
      },
    ),

    updateChecklistItem: combineResolvers(
      isAuthenticated,
      isItemOwner,
      async (parent, { checklistId, id, description,
                        is_completed, completed_at, updated_by,
                        due, due_interval, due_unit, urgency
      }, { models, me }) => {
        return await models.sequelize.transaction(async function(t){
          const checklist = await models.Checklist.findByPk(checklistId)
          if(checklist) {
            const item = await models.Item.findOne({where: {
                                      id : id,
                                      checklistId: checklist.id
                                  }})
            item.update({
              description, is_completed, completed_at, updated_by,
              due, due_interval, due_unit, urgency
            }, {transaction: t});

            await models.History.create({
              loggable_id: item.id,
              loggable_type: "items",
              action: "update",
              value: JSON.stringify(item),
              kwuid: me.id,
              userId: me.id
            }, {transaction: t});

            return item
          }else {
            throw new Error('Checklist not found!')
          }
        });
      },
    ),

    deleteChecklistItem: combineResolvers(
      isAuthenticated,
      async (parent, { checklistId, id }, { models, me }) => {
        try {
          await models.sequelize.transaction(async function(t){
            const checklist = await models.Checklist.findByPk(checklistId)

            if(checklist) {
              const item = await models.Item.findOne({where: {
                                        id : id,
                                        checklistId: checklist.id
                                    }})
              if(item) {
                if (item.userId !== me.id) {
                  throw new ForbiddenError('Not authenticated as owner.');
                }

                await models.History.create({
                  loggable_id: item.id,
                  loggable_type: "items",
                  action: "destroy",
                  value: JSON.stringify(item),
                  kwuid: me.id,
                  userId: me.id
                }, {transaction: t});

                return item.destroy({where: { id: id}}, {transaction: t});
              } else {
                throw new Error('Item not found!')
              }
            } else {
              throw new Error('Checklist not found!')
            }
          });

          return true
        }catch( err ) {
          throw new Error(err)
        }
      },
    ),
  },

  Item: {
    checklist: async (item, args, { models }) => {
      return await models.Checklist.findByPk(item.userId);
    },
    user: async (item, args, { models }) => {
      return await models.User.findByPk(item.userId);
    },
  },
};
