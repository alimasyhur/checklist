import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    items(cursor: String, limit: Int): ItemConnection!
    item(id: ID!): Item!
  }

  extend type Mutation {
    createItem(
      description: String!, is_completed: Boolean, due: String, due_interval: Int,
      due_unit: String, urgency: Int
    ): Item!
    updateItem(
      id: ID!, description: String!,
      is_completed: Boolean, completed_at: String, updated_by: String,
      due: String, due_interval: Int, due_unit: String, urgency: Int
    ): Item!
    deleteItem(id: ID!): Boolean!
  }

  type ItemConnection {
    edges: [Item!]!
    pageInfo: PageInfo!
  }

  type Item {
    id: ID!
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
    user: User!
    checklist: Checklist!
  }
`;
