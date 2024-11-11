export const schema = gql`
  # **********************************************************************************************************************
  # *                                          RESOLVERS                                                                 *
  # **********************************************************************************************************************

  type Query {
    taskHistories(
      limit: Int
      page: Int
      filter: TaskHistoriesFilter
      sortBy: SortByInput
    ): TaskHistoryCollection! @requireAuth
    taskHistory(id: String!): TaskHistory @requireAuth
  }

  type Mutation {
    createTaskHistory(input: CreateTaskHistoryInput!): TaskHistory! @requireAuth
    updateTaskHistory(id: String!, input: UpdateTaskHistoryInput!): TaskHistory! @requireAuth
    deleteTaskHistory(id: String!): TaskHistory! @requireAuth
  }

  # **********************************************************************************************************************
  # *                                          ENUMS                                                                     *
  # **********************************************************************************************************************

  enum TaskAction {
    CREATED
    UPDATED
    ASSIGNED
    MEETING
    PAYMENT
    COMMENTED
  }

  # **********************************************************************************************************************
  # *                                          TYPES                                                                     *
  # **********************************************************************************************************************

  type TaskHistory {
    id: ID!
    action: TaskAction!
    details: String
    createdAt: DateTime
    updatedAt: DateTime

    # Relations
    task: Task!
    client: Client!
    user: User!

    # Audit Relations
    createdBy: User
    updatedBy: User
    deletedBy: User
  }

  type TaskHistoryCollection {
    pageInfo: PageInfo
    items: [TaskHistory!]!
  }

  # **********************************************************************************************************************
  # *                                          INPUTS                                                                    *
  # **********************************************************************************************************************

  input CreateTaskHistoryInput {
    action: TaskAction!
    details: String
    taskId: String
    createdAt: DateTime
  }

  input UpdateTaskHistoryInput {
    id: String
    action: TaskAction
    details: String
    taskId: String
    createdAt: DateTime
  }

  # **********************************************************************************************************************
  # *                                          FILTERS                                                                   *
  # **********************************************************************************************************************

  input TaskHistoriesFilter {
    fullTextSearch: String
    id: IDFilter
    action: [TaskAction]
    taskId: IDFilter
    clientId: IDFilter
    userId: IDFilter
    createdAt: DateFilter
    updatedAt: DateFilter
  }
`
