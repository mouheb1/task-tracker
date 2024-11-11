export const schema = gql`
  # **********************************************************************************************************************
  # *                                          RESOLVERS                                                                 *
  # **********************************************************************************************************************

  type Query {
    users(
      limit: Int
      page: Int
      filter: UsersFilter
      sortBy: SortByInput
    ): UserCollection! @requireAuth
    user(id: String!): User @requireAuth
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }

  # **********************************************************************************************************************
  # *                                          ENUMS                                                                     *
  # **********************************************************************************************************************

  enum UserRole {
    OWNER
    ADMIN
    USER
  }

  # **********************************************************************************************************************
  # *                                          TYPES                                                                     *
  # **********************************************************************************************************************

  type User {
    id: ID!
    username: String!
    familyName: String
    givenName: String
    email: String!
    avatar: String
    hashedPassword: String
    role: UserRole
    organization: Organization
    resetToken: String
    resetTokenExpiresAt: DateTime
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime

    # Relations
    clients: [Client]
    tasks: [Task]
    taskHistories: [TaskHistory]

    # Audit Relations
    createdTasks: [Task]
    updatedTasks: [Task]
    deletedTasks: [Task]
    createdClients: [Client]
    updatedClients: [Client]
    deletedClients: [Client]
    createdTaskHistories: [TaskHistory]
    updatedTaskHistories: [TaskHistory]
    deletedTaskHistories: [TaskHistory]
  }

  type UserCollection {
    pageInfo: PageInfo
    items: [User!]!
  }

  # **********************************************************************************************************************
  # *                                          INPUTS                                                                    *
  # **********************************************************************************************************************

  input CreateUserInput {
    username: String!
    email: String!
    avatar: String
    familyName: String
    givenName: String
    password: String!
    role: UserRole
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    username: String
    familyName: String
    givenName: String
    email: String
    avatar: String
    password: String
    role: UserRole
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  # **********************************************************************************************************************
  # *                                          FILTERS                                                                   *
  # **********************************************************************************************************************

  input UsersFilter {
    fullTextSearch: String
    id: IDFilter
    username: StringFilter
    email: StringFilter
    role: [UserRole]
    createdAt: DateFilter
    updatedAt: DateFilter
  }
`
