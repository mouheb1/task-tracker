export const schema = gql`
  # **********************************************************************************************************************
  # *                                          RESOLVERS                                                                 *
  # **********************************************************************************************************************

  type Query {
    clients(
      limit: Int
      page: Int
      filter: ClientsFilter
      sortBy: SortByInput
    ): ClientCollection! @requireAuth
    client(id: String!): Client @requireAuth
  }

  type Mutation {
    createClient(input: CreateClientInput!): Client! @requireAuth
    updateClient(id: String!, input: UpdateClientInput!): Client! @requireAuth
    deleteClient(id: String!): Client! @requireAuth
  }

  # **********************************************************************************************************************
  # *                                          TYPES                                                                     *
  # **********************************************************************************************************************

  enum ClientGender {
    MALE
    FEMALE
  }

  type Client {
    id: ID!
    familyName: String
    givenName: String
    email: String
    phone: String
    address: String
    notes: String
    avatar: String
    gender: ClientGender
    active: Boolean
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime

    # Relations
    owner: User
    tasks: [Task]
    taskHistories: [TaskHistory]

    # Audit Relations
    createdBy: User
    updatedBy: User
    deletedBy: User
  }

  type ClientCollection {
    pageInfo: PageInfo
    items: [Client!]!
  }

  # **********************************************************************************************************************
  # *                                          INPUTS                                                                    *
  # **********************************************************************************************************************

  input CreateClientInput {
    familyName: String!
    givenName: String!
    email: String
    phone: String
    address: String
    avatar: String
    notes: String
    gender: ClientGender
    active: Boolean
    ownerId: String!
  }

  input UpdateClientInput {
    familyName: String
    givenName: String
    email: String
    phone: String
    address: String
    avatar: String
    notes: String
    gender: ClientGender
    active: Boolean
    ownerId: String
  }

  # **********************************************************************************************************************
  # *                                          FILTERS                                                                   *
  # **********************************************************************************************************************

  input ClientsFilter {
    fullTextSearch: String
    id: IDFilter
    email: [String]
    ownerId: IDFilter
    active: Boolean
    createdAt: DateFilter
    updatedAt: DateFilter
  }
`
