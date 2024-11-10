// -- ./src/components/DashboardPage/Client/NewClient/NewClient.tsx
import type {
  CreateClientMutation,
  CreateClientInput,
  CreateClientMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ClientForm from 'src/components/DashboardPage/Client/ClientForm'
import { Card, CardContent, CardHeader, CardTitle } from 'src/template/ui/card'
import { handleError } from 'src/lib/utils'

const CREATE_USER_MUTATION: TypedDocumentNode<
  CreateClientMutation,
  CreateClientMutationVariables
> = gql`
  mutation CreateClientMutation($input: CreateClientInput!) {
    createClient(input: $input) {
      id
    }
  }
`

const NewClient = () => {
  const [createClient, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('Client created')
      navigate(routes.dashboardPageClients())
    },
    onError: (error) => {
      toast.error(handleError(error))
    }
  })

  const onSave = (input: CreateClientInput) => {
    createClient({ variables: { input } })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New</CardTitle>
      </CardHeader>
      <CardContent>
        <ClientForm onSave={onSave} loading={loading} error={error} />
      </CardContent>
    </Card>
  )
}

export default NewClient
