export const schema = gql`
  # **********************************************************************************************************************
  # *                                          RESOLVERS                                                                 *
  # **********************************************************************************************************************

  type Query {
    tasks(
      limit: Int
      page: Int
      filter: TasksFilter
      sortBy: SortByInput
    ): TaskCollection! @requireAuth
    task(id: String!): Task @requireAuth
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: String!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: String!): Task! @requireAuth
  }

  # **********************************************************************************************************************
  # *                                          ENUMS                                                                     *
  # **********************************************************************************************************************

  enum TaskStatus {
    PENDING
    IN_PROGRESS
    COMPLETED
    CANCELLED
  }

  # **********************************************************************************************************************
  # *                                          TYPES                                                                     *
  # **********************************************************************************************************************

  type Task {
    id: ID!
    title: String!
    description: String
    status: TaskStatus
    dueDate: DateTime
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime

    # Relations
    owner: User
    client: Client
    taskHistories: [TaskHistory]

    # Audit Relations
    createdBy: User
    updatedBy: User
    deletedBy: User
  }

  type TaskCollection {
    pageInfo: PageInfo
    items: [Task!]!
  }

  # **********************************************************************************************************************
  # *                                          INPUTS                                                                    *
  # **********************************************************************************************************************

  input CreateTaskInput {
    title: String!
    description: String
    status: TaskStatus
    dueDate: DateTime
    clientId: String!
    taskHistories: [CreateTaskHistoryInput!]! # Add this line
  }

  input UpdateTaskInput {
    title: String
    description: String
    status: TaskStatus
    dueDate: DateTime
    clientId: String
    taskHistories: [UpdateTaskHistoryInput!] # Add this line
  }

  # **********************************************************************************************************************
  # *                                          FILTERS                                                                   *
  # **********************************************************************************************************************

  input TasksFilter {
    fullTextSearch: String
    id: IDFilter
    status: [TaskStatus]
    ownerId: IDFilter
    clientId: IDFilter
    createdAt: DateFilter
    updatedAt: DateFilter
  }
`
