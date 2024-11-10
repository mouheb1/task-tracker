// -- ./src/components/DashboardPage/Task/Task/Task.tsx
import type {
  DeleteTaskMutation,
  DeleteTaskMutationVariables,
  FindTaskById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'
import { handleError } from 'src/lib/utils'

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`

interface Props {
  task: NonNullable<FindTaskById['task']>
}

const Task = ({ task }: Props) => {
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task deleted')
      navigate(routes.dashboardPageTasks())
    },
    onError: (error) => {
      toast.error(handleError(error))
    },
  })

  const onDeleteClick = (id: DeleteTaskMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete task ' + id + '?')) {
      deleteTask({ variables: { id } })
    }
  }

  return (
    <div className="mb-8 p-1 md:p-6">
      {/* Task Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8 gap-y-6">
        {/* Task Details Grid */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 md:gap-x-8 gap-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Name</span>
            <span className="text-gray-900">{task.name}</span>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Description</span>
            <span className="text-gray-900">{task.description || 'N/A'}</span>
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-4 space-x-4">
        <Link
          to={routes.dashboardPageEditTask({ id: task.id })}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
        >
          Edit
        </Link>
        <button
          type="button"
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 transition"
          onClick={() => onDeleteClick(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Task
