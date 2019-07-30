import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    templates(cursor: String, limit: Int): TemplateConnection!
    template(id: ID!): Template!
  }

  extend type Mutation {
    createTemplate(name: String!, checklist: String!, items: String!): Template!
    deleteTemplate(id: ID!): Boolean!
  }

  type TemplateConnection {
    edges: [Template!]!
    pageInfo: PageInfo!
  }

  type Template {
    id: ID!
    name: String!
    checklist: String!
    items: String!
    createdAt: Date!
    updatedAt: Date!
    user: User!
  }
`;
