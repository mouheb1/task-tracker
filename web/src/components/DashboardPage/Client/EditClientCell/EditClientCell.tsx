// -- ./src/components/DashboardPage/Client/EditClientCell/EditClientCell.tsx
import type {
  EditClientById,
  UpdateClientInput,
  UpdateClientMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ClientForm from 'src/components/DashboardPage/Client/ClientForm'
import { Card, CardContent, CardHeader, CardTitle } from 'src/template/ui/card'
import { handleError } from 'src/lib/utils'

export const QUERY: TypedDocumentNode<EditClientById> = gql`
  query EditClientById($id: String!) {
    client: client(id: $id) {
      id
      givenName
      familyName
      email
      avatar
      gender
      notes
      phone
      createdAt
      updatedAt
    }
  }
`

const UPDATE_USER_MUTATION: TypedDocumentNode<
  EditClientById,
  UpdateClientMutationVariables
> = gql`
  mutation UpdateClientMutation($id: String!, $input: UpdateClientInput!) {
    updateClient(id: $id, input: $input) {
      id
      givenName
      familyName
      email
      avatar
      gender
      notes
      phone
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

/* export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)
 */
export const Success = ({ client }: CellSuccessProps<EditClientById>) => {
  const [updateClient, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('Client updated')
      navigate(routes.dashboardPageClients())
    },
    onError: (error) => {
      toast.error(handleError(error))
    },
  })

  const onSave = (input: UpdateClientInput, id: EditClientById['client']['id']) => {
    updateClient({ variables: { id, input } })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit</CardTitle>
      </CardHeader>
      <CardContent>
        <ClientForm client={client} onSave={onSave} error={error} loading={loading} />
      </CardContent>
    </Card>
  )
}
