import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    checklists(cursor: String, limit: Int): ChecklistConnection!
    checklist(id: ID!): Checklist!
  }

  extend type Mutation {
    createChecklist(
      object_id: String!, object_domain: String!, description: String!,
      is_completed: Boolean, due: String, due_interval: Int,
      due_unit: String, urgency: Int
    ): Checklist!
    updateChecklist(
      id: ID!, object_id: String!, object_domain: String!, description: String!,
      is_completed: Boolean, completed_at: String, updated_by: String,
      due: String, due_interval: Int, due_unit: String, urgency: Int
    ): Checklist!
    deleteChecklist(id: ID!): Boolean!
  }

  type ChecklistConnection {
    edges: [Checklist!]!
    pageInfo: PageInfo!
  }

  type Checklist {
    id: ID!
    object_id: String!
    object_domain: String!
    description: String!
    is_completed: Boolean
    completed_at: String
    updated_by: String
    due: String
    due_interval: Int
    due_unit: String
    urgency: Int
    createdAt: Date!
    updatedAt: Date!
    items: [Item!]
    user: User!
    template: Template!
  }
`;
