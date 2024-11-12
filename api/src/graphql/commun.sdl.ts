// -- ./src/graphql/commun.sdl.ts
export const schema = gql`

scalar JSON

enum SortDirection {
  ASC
  DESC
}

input SortByInput {
  field: String!
  direction: SortDirection!
}


type SuccessResponse {
  success: Boolean
  message: String
}

type PageInfo {
  currentPage: Int!
  totalCount: Int
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  totalPages: Int
  # pageCount: Int
  # refetch: Boolean
}
`