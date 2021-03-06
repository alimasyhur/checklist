import { ForbiddenError } from 'apollo-server-express';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
    me ? skip : new ForbiddenError('Not authenticated as user.');

export const isTemplateOwner = async (
    parent,
    { id },
    { models, me },
) => {
    const template = await models.Template.findByPk(id, { raw: true });

    if (template.userId !== me.id) {
        throw new ForbiddenError('Not authenticated as owner.');
    }

    return skip;
};

export const isChecklistOwner = async (
    parent,
    { id },
    { models, me },
) => {
    const checklist = await models.Checklist.findByPk(id, { raw: true });

    if (checklist.userId !== me.id) {
        throw new ForbiddenError('Not authenticated as owner.');
    }

    return skip;
};

export const isItemOwner = async (
    parent,
    { id },
    { models, me },
) => {
    const item = await models.Item.findByPk(id, { raw: true });

    if (item.userId !== me.id) {
        throw new ForbiddenError('Not authenticated as owner.');
    }

    return skip;
};


export const isHistoryOwner = async (
    parent,
    { id },
    { models, me },
) => {
    const history = await models.History.findByPk(id, { raw: true });

    if (history.userId !== me.id) {
        throw new ForbiddenError('Not authenticated as owner.');
    }

    return skip;
};
