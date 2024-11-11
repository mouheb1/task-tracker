// -- ./src/components/DashboardPage/Task/TasksCell/TasksCell.tsx

import type { FindTasks, FindTasksVariables } from 'types/graphql'

import { useState } from 'react'
import { useQuery } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'

import Tasks from 'src/components/DashboardPage/Task/Tasks'

export const QUERY: TypedDocumentNode<FindTasks, FindTasksVariables> = gql`
  query FindTasksForAdmin($limit: Int, $page: Int, $sortBy: SortByInput, $filter: TasksFilter) {
    tasks(limit: $limit, page: $page, sortBy: $sortBy, filter: $filter) {
      items {
        id
        status
        title
        client {
          givenName
          familyName
        }
        dueDate
        description
        createdAt
        updatedAt
      }
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        totalCount
        totalPages
      }
    }
  }
`

const TasksCell = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data, loading, error, refetch } = useQuery<FindTasks, FindTasksVariables>(QUERY, {
    variables: {
      limit: pageSize,
      page: currentPage,
    },
    fetchPolicy: 'network-only',
  })

  if (loading)
    return (
      <Tasks
        items={[]}
        pageInfo={{} as any}
        onPageChange={null}
        pageSize={1}
        currentPage={10}
        refetch={null}
      />
    )

  if (error) return <div className="rw-cell-error">{error?.message}</div>

  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page)
    setPageSize(pageSize)
    refetch({
      limit: pageSize,
      page: page,
    })
  }

  return (
    <Tasks
      items={data.tasks.items}
      pageInfo={data.tasks.pageInfo}
      onPageChange={onPageChange}
      pageSize={pageSize}
      currentPage={currentPage}
      refetch={refetch}
    />
  )
}

export default TasksCell
