import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';

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
        return await models.Template.create({
          name,
          checklist,
          items,
          userId: me.id,
        });
      },
    ),

    updateTemplate: combineResolvers(
      isAuthenticated,
      isTemplateOwner,
      async (parent, { id, name, checklist, items }, { models, me }) => {
        const template = await models.Template.findByPk(id)
        return template.update({
          name,
          checklist,
          items
        });
      },
    ),

    deleteTemplate: combineResolvers(
      isAuthenticated,
      isTemplateOwner,
      async (parent, { id }, { models }) => {
        return await models.Template.destroy({ where: { id } });
      },
    ),
  },

  Template: {
    user: async (template, args, { models }) => {
      return await models.User.findByPk(template.userId);
    },
  },
};
