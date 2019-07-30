import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    histories(cursor: String, limit: Int): HistoryConnection!
    history(id: ID!): History!
  }

  type HistoryConnection {
    edges: [History!]!
    pageInfo: PageInfo!
  }

  type History {
    id: ID!
    loggable_type: String!
    loggable_id: Int!
    action: String!
    kwuid: Int
    value: String
    createdAt: Date!
    updatedAt: Date!
    user: User!
  }
`;
