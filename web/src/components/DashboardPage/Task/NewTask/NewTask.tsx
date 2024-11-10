// -- ./src/components/DashboardPage/Task/NewTask/NewTask.tsx
import type {
  CreateTaskMutation,
  CreateTaskInput,
  CreateTaskMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TaskForm from 'src/components/DashboardPage/Task/TaskForm'
import { Card, CardContent, CardHeader, CardTitle } from 'src/template/ui/card'

const CREATE_TASK_MUTATION: TypedDocumentNode<
  CreateTaskMutation,
  CreateTaskMutationVariables
> = gql`
  mutation CreateTaskMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`

const NewTask = () => {
  const [createTask, { loading, error }] = useMutation(
    CREATE_TASK_MUTATION,
    {
      onCompleted: () => {
        toast.success('Task created')
        navigate(routes.dashboardPageTasks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateTaskInput) => {
    createTask({ variables: { input } })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New</CardTitle>
      </CardHeader>
      <CardContent>
        <TaskForm onSave={onSave} loading={loading} error={error} />
      </CardContent>
    </Card>
  )
}

export default NewTask
