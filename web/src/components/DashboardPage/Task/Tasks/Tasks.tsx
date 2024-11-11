// -- ./src/components/DashboardPage/Task/Tasks/Tasks.tsx
import type {
  Client,
  DeleteTaskMutation,
  DeleteTaskMutationVariables,
} from 'types/graphql'

import { navigate, parseSearch, routes, useLocation } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { Table } from 'src/template/components/table'
import type { TableColType } from 'src/template/components/table'
import { SortingState } from '@tanstack/react-table'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_TASK_MUTATION: TypedDocumentNode<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
> = gql`
  mutation DeleteTaskMutation($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`

interface Task {
  id: string
  name: string
  description: string
  client: Partial<Client>
  status: string
  title: string
  dueDate: string
}

interface PageInfo {
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalCount: number
  totalPages: number
}

interface TasksProps {
  items: Partial<Task>[]
  pageInfo: Partial<PageInfo>
  onPageChange: (page: number, pageSize: number) => void
  pageSize: number
  currentPage: number
  refetch: (e?: Record<string, any>) => void
}

const validSortableColumns = ['name', 'grade']

const Tasks = ({
  items,
  pageInfo,
  onPageChange,
  pageSize,
  currentPage,
  refetch,
}: TasksProps) => {
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task deleted')
      refetch()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { search, searchParams } = useLocation()

  const onDeleteClick = (id: DeleteTaskMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete task ' + id + '?')) {
      deleteTask({ variables: { id } })
    }
  }

  const columns: TableColType<Partial<Task>>[] = [
    {
      title: 'Title',
      key: 'title',
      render: (cellContext) => truncate(cellContext.row.original.title),
    },
    {
      title: 'Status',
      key: 'status',
      render: (cellContext) => truncate(cellContext.row.original.status),
    },
    {
      title: 'Client',
      key: 'client',
      render: (cellContext) => truncate(cellContext.row.original.client?.givenName) + '' + truncate(cellContext.row.original.client?.familyName),
    },
    {
      title: 'DueDate',
      key: 'dueDate',
      render: (cellContext) => {
        return timeTag(cellContext.row.original.dueDate)
      },
    },
  ]

  const actions = {
    onPaginationChange: (pagination: any) => {
      const { pageIndex, pageSize } = pagination
      onPageChange(pageIndex, pageSize)
    },
    onDelete: (rowData: Partial<Task>) => {
      onDeleteClick(rowData.id)
    },
    onEdit: (rowData: Partial<Task>) => {
      navigate(
        routes.dashboardPageEditTask({
          id: rowData.id,
        })
      )
    },
    onView: (rowData: Partial<Task>) => {
      navigate(
        routes.dashboardPageTask({
          id: rowData.id,
        })
      )
    },
    onSearch: (value: string) => {
      console.log('current search page', currentPage)
      navigate(routes.dashboardPageTasks({ ...parseSearch(search), q: value }), { replace: true })
      refetch({
        limit: pageSize,
        page: 1,
        filter: { fullTextSearch: value }
      })
    },
    onSort: (sorting: SortingState) => {
      if (!Array.isArray(sorting) || !sorting.length) return

      const { id, desc } = sorting[0]

      // Check if the column exists in the schema
      if (!validSortableColumns.includes(id)) {
        console.log(`Sorting is not allowed for column: ${id}`)
        return
      }
      refetch({
        limit: pageSize,
        page: 1,
        sortBy: { field: id, direction: desc ? 'DESC' : 'ASC' },
      })
    }

  }

  return (
    <Table
      columns={columns}
      actions={actions}
      data={items}
      rowCount={pageInfo.totalCount || 0}
      currentPage={currentPage}
      pageSize={pageSize}
      filter={{ searchValue: searchParams.get('q') }}
    />
  )
}

export default Tasks
