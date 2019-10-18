import { gql } from 'apollo-server-express';

export default gql`
extend type Query {
    items(cursor: String, limit: Int): ItemConnection!
    item(id: ID!): Item!
    checklistItem(checklistId: Int!, itemId: Int!): Item!
}

extend type Mutation {
    createChecklistItem(
        checklistId: Int!, description: String!, is_completed: Boolean,
        due: String, due_interval: Int, due_unit: String, urgency: Int
    ): Item!
    updateChecklistItem(
        checklistId: Int!, id: Int!, description: String!,
        is_completed: Boolean, completed_at: String, updated_by: String,
        due: String, due_interval: Int, due_unit: String, urgency: Int
    ): Item!
    deleteChecklistItem(checklistId: Int!, id: Int!): Boolean!
    completeChecklistItems(data: [ItemsCompleteInput!]!): [ItemsCompleteResponse]
    incompleteChecklistItems(data: [ItemsCompleteInput!]!): [ItemsCompleteResponse]
  }

type ItemsCompleteResponse {
    id: Int
    itemId: Int
    is_completed: Boolean
    checklistId: Int
}

input ItemsCompleteInput {
    itemId: ID!
}

type ItemConnection {
    edges: [Item!]!
    pageInfo: PageInfo!
}

type Item {
    id: ID!
    description: String
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
