// -- ./src/graphql/organizations.sdl.ts
export const schema = gql`
  type Organization {
    id: String!
    name: String!
    address: String
    phone: String
    email: String
    website: String
    description: String
    active: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
  }

  type Query {
    organizations: [Organization!]! @requireAuth
    organization(id: String!): Organization @requireAuth
  }

  input CreateOrganizationInput {
    name: String!
    address: String
    phone: String
    email: String
    website: String
    description: String
    active: Boolean!
    deletedAt: DateTime
  }

  input UpdateOrganizationInput {
    name: String
    address: String
    phone: String
    email: String
    website: String
    description: String
    active: Boolean
    deletedAt: DateTime
  }

  type Mutation {
    createOrganization(input: CreateOrganizationInput!): Organization!
      @requireAuth
    updateOrganization(
      id: String!
      input: UpdateOrganizationInput!
    ): Organization! @requireAuth
    deleteOrganization(id: String!): Organization! @requireAuth
  }
`
