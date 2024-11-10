// -- ./src/components/DashboardPage/Client/Clients/Clients.tsx
import type {
  Grade,
  DeleteClientMutation,
  DeleteClientMutationVariables,
  ClientRole,
} from 'types/graphql'

import { Link, navigate, parseSearch, routes, useLocation } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { TableColType, Table } from 'src/template/components/table'

import { PaginationState, SortingState } from "@tanstack/react-table";
import { timeTag, truncate } from 'src/lib/formatters'
import { ClientGender } from 'src/lib/type'

const DELETE_USER_MUTATION: TypedDocumentNode<
  DeleteClientMutation,
  DeleteClientMutationVariables
> = gql`
  mutation DeleteClientMutation($id: String!) {
    deleteClient(id: $id) {
      id
    }
  }
`

interface Client {
  id?: string
  givenName?: string
  familyName?: string
  clientname?: string
  email?: string
  phone?: string
  birthDate: Date
  gender: ClientGender
  avatar?: string;
  role?: ClientRole
  childrenIds?: string
  grade?: Partial<Grade>
  createdAt?: string
  updatedAt?: string
}

interface PageInfo {
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalCount?: number
  totalPages?: number
}

interface ClientsProps {
  items: Partial<Client[]>
  pageInfo: PageInfo
  onPageChange: (page: number, pageSize: number) => void
  pageSize: number
  currentPage: number
  refetch: (e?: Record<string, any>) => void
}

const validSortableColumns = ['email', 'createdAt']

const Clients = ({ items, pageInfo, onPageChange, pageSize, currentPage, refetch }: ClientsProps) => {
  const [deleteClient] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('Client deleted')
      refetch()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { search, searchParams } = useLocation()

  const onDeleteClick = (id: DeleteClientMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete client ' + id + '?')) {
      deleteClient({ variables: { id } })
    }
  }

  const columns: TableColType<Client>[] = [
    {
      title: 'Email',
      key: 'email',
      render: (cellContext) => {
        return truncate(cellContext.row.original.email)
      },
    },
    {
      title: 'Clientname',
      key: 'clientname',
      render: (cellContext) => {
        return truncate(cellContext.row.original.givenName) + ' ' + truncate(cellContext.row.original.familyName)
      },
    },
    {
      title: 'Role',
      key: 'role',
      render: (cellContext) => {
        return cellContext.row.original.role || 'No Role'
      },
    },
    {
      title: 'Created At',
      key: 'createdAt',
      render: (cellContext) => {
        return timeTag(cellContext.row.original.createdAt)
      },
    },
  ]

  // Handles pagination change
  const handleTableChange = (pagination: PaginationState) => {
    const { pageSize, pageIndex } = pagination
    onPageChange(pageIndex, pageSize)
  }

  const actions = {
    onPaginationChange: handleTableChange,
    onDelete: (rowData: Client) => {
      onDeleteClick(rowData.id)
    },
    onEdit: (rowData: Client) => {
      navigate(routes.dashboardPageEditClient({
        id: rowData.id,
      }))
    },
    onView: (rowData: Client) => {
      navigate(routes.dashboardPageClient({
        id: rowData.id,
      }))
    },
    onSearch: (value: string) => {
      navigate(routes.dashboardPageClients({ ...parseSearch(search), q: value }), { replace: true })
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

  // TODO memo this
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

export default Clients
