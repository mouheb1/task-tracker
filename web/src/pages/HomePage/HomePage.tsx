// -- ./src/pages/HomePage/HomePage.tsx
import type { FindTasks, FindTasksVariables } from 'types/graphql'

import {
  type TypedDocumentNode,
  useQuery,
} from '@redwoodjs/web'


export const QUERY: TypedDocumentNode<FindTasks, FindTasksVariables> =
  gql`
    query FindTasksView($filter: TasksFilter) {
      tasks(filter: $filter) {
        items {
          id
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


const HomePage = () => {

  const { data, loading, error, refetch } = useQuery<FindTasks, FindTasksVariables>(QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      filter: {
        gradeId: {
          in: []
        }
      }
    }
  })

  if (loading) return <div></div>

  if (error) return <div className="rw-cell-error">{error?.message}</div>

  return (
    // <TaskView items={data.timetables?.items} />
    <div></div>
  )
}

export default HomePage