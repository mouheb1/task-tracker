// -- ./src/components/DashboardPage/Client/ClientsCell/ClientsCell.tsx
import type { FindClients, FindClientsVariables } from 'types/graphql'

import { useState } from 'react'
import { useQuery } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'

import Clients from 'src/components/DashboardPage/Client/Clients'
import { ClientRole } from 'src/lib/type'

export const QUERY: TypedDocumentNode<FindClients, FindClientsVariables> = gql`
  query FindClients($limit: Int, $page: Int, $sortBy: SortByInput, $filter: ClientsFilter) {
    clients(limit: $limit, page: $page, sortBy: $sortBy, filter: $filter) {
      items {
        id
        notes
        givenName
        familyName
        email
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


const ClientsCell = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data, loading, error, refetch } = useQuery<FindClients, FindClientsVariables>(QUERY, {
    variables: {
      limit: pageSize,
      page: currentPage,
    },
    fetchPolicy: 'network-only',
  })

  if (loading) return (
    <Clients
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
    <Clients
      items={data.clients.items}
      pageInfo={data.clients.pageInfo}
      onPageChange={onPageChange}
      pageSize={pageSize}
      currentPage={currentPage}
      refetch={refetch}
    />
  )
}

export default ClientsCell
