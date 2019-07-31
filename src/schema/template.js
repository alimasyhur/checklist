import { gql } from 'apollo-server-express';

export default gql`
  scalar JSON

  extend type Query {
    templates(cursor: String, limit: Int): TemplateConnection!
    template(id: ID!): Template!
  }

  extend type Mutation {
    createTemplate(name: String!, checklist: ChecklistItemInput!, items: [ChecklistItemInput]!): Template!
    updateTemplate(id: ID!, name: String!, checklist: ChecklistItemInput, items: [ChecklistItemInput]): Template!
    assignTemplate(id: ID!, object_id: String!, object_domain: String!): Checklist!
    assignMultiTemplate(id: ID!, data: [ChecklistTemplateInput!]!): [Checklist!]
    deleteTemplate(id: ID!): Boolean!
  }

  type TemplateConnection {
    edges: [Template!]!
    pageInfo: PageInfo!
  }

  input ChecklistTemplateInput {
    object_id: String!
    object_domain: String!
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
