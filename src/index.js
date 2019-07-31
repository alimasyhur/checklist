import 'dotenv/config';
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import express from 'express';
import jwt from 'jsonwebtoken';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, {sequelize} from './models';

const app = express();

app.use(cors());

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req }) => {
    const me = await getMe(req);

    return {
      models,
      me,
      secret: process.env.SECRET,
    };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const isTest = !!process.env.TEST_DATABASE;

sequelize.sync({ force: isTest }).then(async () => {
  if (isTest) {
    createUsersWithMessages(new Date());
  }

  app.listen({ port: 3000 }, () => {
    console.log('Apollo Server on http://localhost:3000/graphql');
  });
});

const createUsersWithMessages = async date => {
  await models.User.create(
    {
      username: 'alimasyhur',
      email: 'alimasyhur@gmail.com',
      password: 'alimasyhur',
      templates: [
        {
          name: "Template 1",
          checklist: `{"description": "Checklist 1", "due": "asdf", "due_interval": 0, "due_unit": "hour"}`,
          items: `[
                    {"description": "Item 1", "due": "asdf", "due_interval": 0, "due_unit": "hour"},
                    {"description": "Item 2", "due": "asdf", "due_interval": 0, "due_unit": "hour"}
                  ]`
        },
        {
          name: "Template 2",
          checklist: `{"description": "Checklist 2", "due": "asdf", "due_interval": 0, "due_unit": "hour"}`,
          items: `[
                    {"description": "Item 3", "due": "asdf", "due_interval": 0, "due_unit": "hour"},
                    {"description": "Item 4", "due": "asdf", "due_interval": 0, "due_unit": "hour"}
                  ]`
        }
      ],
      checklists: [{
          object_id: "3",
          object_domain: "domain",
          description: "checklist description",
          urgency: 1,
          is_completed: 0,
          templateId: 1
      }],
      items: [{
          description: "Item description",
          urgency: 1,
          is_completed: 0,
          checklistId: 1
      }],
      histories: [{
          loggable_type: "asdf",
          loggable_id: 1,
          action: "update",
          value: "value"
        },
        {
          loggable_type: "zxcv",
          loggable_id: 2,
          action: "assign",
          value: "value"
        }
      ]},
    {
      include: [models.Template, models.Checklist, models.Item, models.History],
    },
  );

  await models.User.create(
    {
      username: 'helloworld',
      email: 'hello@world.com',
      password: 'helloworld'
    },
    {
      include: [models.Template],
    },
  );
};
