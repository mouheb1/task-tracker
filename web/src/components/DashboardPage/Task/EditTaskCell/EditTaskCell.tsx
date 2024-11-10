// -- ./src/components/DashboardPage/Task/EditTaskCell/EditTaskCell.tsx
import type {
  EditTaskById,
  UpdateTaskInput,
  UpdateTaskMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TaskForm from 'src/components/DashboardPage/Task/TaskForm'
import { Card, CardContent, CardHeader, CardTitle } from 'src/template/ui/card'

export const QUERY: TypedDocumentNode<EditTaskById> = gql`
  query EditTaskById($id: String!) {
    task: task(id: $id) {
      id
      title
      description
      taskHistories {
        id
      }
    }
  }
`

const UPDATE_TASK_MUTATION: TypedDocumentNode<
  EditTaskById,
  UpdateTaskMutationVariables
> = gql`
  mutation UpdateTaskMutation($id: String!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

/* export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
) */

export const Success = ({ task }: CellSuccessProps<EditTaskById>) => {
  const [updateTask, { loading, error }] = useMutation(
    UPDATE_TASK_MUTATION,
    {
      onCompleted: () => {
        toast.success('Task updated')
        navigate(routes.dashboardPageTasks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateTaskInput,
    id: EditTaskById['task']['id']
  ) => {
    updateTask({ variables: { id, input } })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update</CardTitle>
      </CardHeader>
      <CardContent>
        <TaskForm
          task={task}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </CardContent>
    </Card>
  )
}
