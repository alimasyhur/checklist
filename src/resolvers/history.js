import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated, isHistoryOwner } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
    Buffer.from(string, 'base64').toString('ascii');

export default {
    Query: {
        histories: combineResolvers(
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

                const histories = await models.History.findAll({
                    order: [['createdAt', 'DESC']],
                    limit: limit + 1,
                    ...cursorOptions,
                });

                const hasNextPage = histories.length > limit;
                const edges = hasNextPage ? histories.slice(0, -1) : histories;

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
        history: combineResolvers(
            isAuthenticated,
            isHistoryOwner,
            async (parent, { id }, { models }) => {
                return await models.History.findByPk(id);
            }
        ),
    },

    History: {
        user: async (history, args, { models }) => {
            return await models.History.findByPk(history.userId);
        },
    },
};
