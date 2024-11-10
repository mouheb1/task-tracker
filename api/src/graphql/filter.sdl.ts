// -- ./src/graphql/filter.sdl.ts
export const schema = gql`

# ----------------------------------- Ranges -----------------------------------------------------

input IDRange {
  min: ID
  max: ID
}

input IntRange {
  min: Int
  max: Int
}

input FloatRange {
  min: Float
  max: Float
}

input DateRange {
  min: DateTime
  max: DateTime
}

input DateTimeRange {
  min: DateTime
  max: DateTime
}

# ----------------------------------- Filters -----------------------------------------------------

input IDFilter {
  eq: ID
  notEq: ID
  in: [ID!]
  notIn: [ID!]
  between: IDRange
  isNull: Boolean
}

input IntFilter {
  eq: Int
  notEq: Int
  in: [Int!]
  notIn: [Int!]
  lte: Int
  lt: Int
  gte: Int
  gt: Int
  between: IntRange
  isNull: Boolean
}

input FloatFilter {
  eq: Float
  notEq: Float
  in: [Float!]
  notIn: [Float!]
  lte: Float
  lt: Float
  gte: Float
  gt: Float
  between: FloatRange
  isNull: Boolean
}

input StringFilter {
  eq: String
  notEq: String
  in: [String!]
  notIn: [String!]
  startsWith: String
  endsWith: String
  contains: String
  isNull: Boolean
}

input BooleanFilter {
  eq: Boolean
  notEq: Boolean
}

input DateFilter {
  eq: DateTime
  notEq: DateTime
  in: [Date!]
  notIn: [Date!]
  lte: DateTime
  lt: DateTime
  gte: DateTime
  gt: DateTime
  between: DateRange
  isNull: Boolean
}

input DateTimeFilter {
  eq: DateTime
  notEq: DateTime
  in: [DateTime!]
  notIn: [DateTime!]
  lte: DateTime
  lt: DateTime
  gte: DateTime
  gt: DateTime
  between: DateTimeRange
  isNull: Boolean
}

`