const { gql } = require('apollo-server-express')

const typeDefs = gql`
                      type Checklist {
                        id: ID!
                        object_id: String!
                        object_domain: String!
                        description: String!
                      }

                      type Query {
                        checklist(id: ID!): Checklist
                        checklists: [Checklist!]!
                      }

                      type Mutation {
                        addChecklist(object_id: String,
                                      object_domain:String!,
                                      description: ID!): Checklist!
                      }`

module.exports = typeDefs
