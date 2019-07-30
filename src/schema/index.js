import { gql } from 'apollo-server-express';

import userSchema from './user';
import templateSchema from './template';
import historySchema from './history';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: Date!
  }
`;

export default [
                  linkSchema,
                  userSchema,
                  templateSchema,
                  historySchema
                ];
