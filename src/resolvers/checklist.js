import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';
import GraphQLJSON from 'graphql-type-json';
import { isAuthenticated, isChecklistOwner } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    checklists: combineResolvers(
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

        const checklists = await models.Checklist.findAll({
          order: [['createdAt', 'DESC']],
          limit: limit + 1,
          ...cursorOptions,
        });

        const hasNextPage = checklists.length > limit;
        const edges = hasNextPage ? checklists.slice(0, -1) : checklists;

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
    checklist: combineResolvers(
      isAuthenticated,
      isChecklistOwner,
      async (parent, { id }, { models }) => {
        return await models.Checklist.findByPk(id);
      }
    ),
  },

  Mutation: {
    createChecklist: combineResolvers(
      isAuthenticated,
      async (parent, {
                        object_id,
                        object_domain,
                        description,
                        is_completed,
                        due,
                        due_interval,
                        due_unit,
                        urgency,
                        items
       }, { models, me }) => {

        return await models.sequelize.transaction(async function(t){
          items = (items === undefined) ? [] : items

          const checklist = await models.Checklist.create({
            object_id,
            object_domain,
            description,
            is_completed,
            due,
            due_interval,
            due_unit,
            urgency,
            userId: me.id,
            items: items
          }, {include: [models.Item]},
            {transaction: t});

          await models.History.create({
            loggable_id: checklist.id,
            loggable_type: "checklists",
            action: "create",
            value: JSON.stringify(checklist),
            kwuid: me.id,
            userId: me.id
          }, {transaction: t});

          return checklist
        });
      },
    ),

    updateChecklist: combineResolvers(
      isAuthenticated,
      isChecklistOwner,
      async (parent, { id, object_id, object_domain, description,
                        is_completed, completed_at, updated_by,
                        due, due_interval, due_unit, urgency
      }, { models, me }) => {
        return await models.sequelize.transaction(async function(t){
          const checklist = await models.Checklist.findByPk(id)
          checklist.update({
            object_id, object_domain, description,
            is_completed, completed_at, updated_by,
            due, due_interval, due_unit, urgency
          }, {transaction: t});

          await models.History.create({
            loggable_id: checklist.id,
            loggable_type: "checklists",
            action: "update",
            value: JSON.stringify(checklist),
            kwuid: me.id,
            userId: me.id
          }, {transaction: t});

          return checklist
        });
      },
    ),

    deleteChecklist: combineResolvers(
      isAuthenticated,
      isChecklistOwner,
      async (parent, { id }, { models, me }) => {
        try {
          await models.sequelize.transaction(async function(t){
            const checklist = await models.Checklist.findByPk(id)

            await models.History.create({
              loggable_id: checklist.id,
              loggable_type: "checklists",
              action: "destroy",
              value: JSON.stringify(checklist),
              kwuid: me.id,
              userId: me.id
            }, {transaction: t});

            return checklist.destroy({where: { id: id}}, {transaction: t});
          });

          return true
        }catch( err ) {
          throw formatError(err)
        }
      },
    ),
  },

  Checklist: {
    template: async (checklist, args, { models }) => {
      return await models.Template.findByPk(checklist.userId);
    },
    items: async (checklist, args, { models }) => {
      return await models.Item.findAll({
        where: {
          checklistId: checklist.id,
        },
      });
    },
    user: async (checklist, args, { models }) => {
      return await models.User.findByPk(checklist.userId);
    },
  },
};
