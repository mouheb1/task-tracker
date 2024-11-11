// -- ./src/components/DashboardPage/Task/TaskCell/TaskCell.tsx
import type { FindTaskById, FindTaskByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Task from 'src/components/DashboardPage/Task/Task'
import { Card, CardContent, CardHeader, CardTitle } from 'src/template/ui/card'

export const QUERY: TypedDocumentNode<
  FindTaskById,
  FindTaskByIdVariables
> = gql`
  query FindTaskById($id: String!) {
    task: task(id: $id) {
      title
      description
      status
      dueDate
      price
      client {
        id
        givenName
        familyName
        email
        phone
      }
      user {
        id
        givenName
        familyName
        email
        organization {
          logo
        }
      }
      taskHistories {
        id
        action
        details
        price
        createdAt
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Task not found</div>

/* export const Failure = ({
  error,
}: CellFailureProps<FindTaskByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
) */

export const Success = ({
  task,
}: CellSuccessProps<FindTaskById, FindTaskByIdVariables>) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
      <Task task={task} />
      </CardContent>
    </Card>
  )
}
