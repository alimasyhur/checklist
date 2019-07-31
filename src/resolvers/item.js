import Sequelize from 'sequelize';
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
  },

  Mutation: {
    createItem: combineResolvers(
      isAuthenticated,
      async (parent, {
                        description,
                        is_completed,
                        due,
                        due_interval,
                        due_unit,
                        urgency
       }, { models, me }) => {

        return await models.sequelize.transaction(async function(t){
          const item = await models.Item.create({
            description,
            is_completed,
            due,
            due_interval,
            due_unit,
            urgency,
            userId: me.id,
          }, {transaction: t});

          await models.History.create({
            loggable_id: item.id,
            loggable_type: "items",
            action: "create",
            value: JSON.stringify(item),
            kwuid: me.id,
            userId: me.id
          }, {transaction: t});

          return item
        });
      },
    ),

    updateItem: combineResolvers(
      isAuthenticated,
      isItemOwner,
      async (parent, { id, description,
                        is_completed, completed_at, updated_by,
                        due, due_interval, due_unit, urgency
      }, { models, me }) => {
        return await models.sequelize.transaction(async function(t){
          const item = await models.Item.findByPk(id)
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
        });
      },
    ),

    deleteItem: combineResolvers(
      isAuthenticated,
      isItemOwner,
      async (parent, { id }, { models, me }) => {
        try {
          await models.sequelize.transaction(async function(t){
            const item = await models.Item.findByPk(id)

            await models.History.create({
              loggable_id: item.id,
              loggable_type: "items",
              action: "destroy",
              value: JSON.stringify(item),
              kwuid: me.id,
              userId: me.id
            }, {transaction: t});

            return item.destroy({where: { id: id}}, {transaction: t});
          });

          return true
        }catch( err ) {
          throw formatError(err)
        }
      },
    ),
  },

  Item: {
    user: async (item, args, { models }) => {
      return await models.User.findByPk(item.userId);
    },
  },
};
