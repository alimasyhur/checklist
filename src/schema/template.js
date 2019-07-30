import { gql } from 'apollo-server-express';

export default gql`
  scalar JSON
  scalar JSONObject

  extend type Query {
    templates(cursor: String, limit: Int): TemplateConnection!
    template(id: ID!): Template!
  }

  extend type Mutation {
    createTemplate(name: String!, checklist: ChecklistItemInput!, items: [ChecklistItemInput]!): Template!
    updateTemplate(id: ID!, name: String!, checklist: ChecklistItemInput, items: [ChecklistItemInput]): Template!
    deleteTemplate(id: ID!): Boolean!
  }

  type TemplateConnection {
    edges: [Template!]!
    pageInfo: PageInfo!
  }

  input ChecklistItemInput {
    description: String!
    urgency: Int
    due: String
    due_interval: Int
    due_unit: String
  }

  type Template {
    id: ID!
    name: String!
    checklist: JSON
    items: JSON
    createdAt: Date!
    updatedAt: Date!
    user: User!
  }
`;
