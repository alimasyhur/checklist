import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

const createToken = async (user, secret, expiresIn) => {
    const { id, email, username } = user;
    return await jwt.sign({ id, email, username }, secret, {
        expiresIn,
    });
};

export default {
    Query: {
        users: async (parent, args, { models }) => {
            return await models.User.findAll();
        },
        user: async (parent, { id }, { models }) => {
            return await models.User.findByPk(id);
        },
        me: async (parent, args, { models, me }) => {
            if (!me) {
                return null;
            }
            return await models.User.findByPk(me.id);
        },
    },

    Mutation: {
        signUp: async (
            parent,
            { username, email, password },
            { models, secret },
        ) => {
            const user = await models.User.create({
                username,
                email,
                password,
            });

            return { token: createToken(user, secret, '120m') };
        },

        signIn: async (
            parent,
            { login, password },
            { models, secret },
        ) => {
            const user = await models.User.findByLogin(login);

            if (!user) {
                throw new UserInputError(
                    'No user found with this login credentials.',
                );
            }

            const isValid = await user.validatePassword(password);

            if (!isValid) {
                throw new AuthenticationError('Invalid password.');
            }

            return { token: createToken(user, secret, '120m') };
        },

        deleteUser: async (parent, { id }, { models }) => {
            return await models.User.destroy({
                where: { id },
            });
        },
    },

    User: {
        templates: async (user, args, { models }) => {
            return await models.Template.findAll({
                where: {
                    userId: user.id,
                },
            });
        },
        checklists: async (user, args, { models }) => {
            return await models.Checklist.findAll({
                where: {
                    userId: user.id,
                },
            });
        },
        items: async (user, args, { models }) => {
            return await models.Item.findAll({
                where: {
                    userId: user.id,
                },
            });
        },
        histories: async (user, args, { models }) => {
            return await models.History.findAll({
                where: {
                    userId: user.id,
                },
            });
        },
    },
};
