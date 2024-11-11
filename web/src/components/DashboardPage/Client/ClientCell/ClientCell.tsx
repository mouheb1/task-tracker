// -- ./src/components/DashboardPage/Client/ClientCell/ClientCell.tsx
import type { FindClientById, FindClientByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Client from 'src/components/DashboardPage/Client/Client'
import { Card, CardContent, CardHeader, CardTitle } from 'src/template/ui/card'

export const QUERY: TypedDocumentNode<FindClientById, FindClientByIdVariables> =
  gql`
    query FindClientById($id: String!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Client not found</div>

/* export const Failure = ({ error }: CellFailureProps<FindClientByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
) */

export const Success = ({
  client,
}: CellSuccessProps<FindClientById, FindClientByIdVariables>) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Client client={client} />
      </CardContent>
    </Card>
  )
}
