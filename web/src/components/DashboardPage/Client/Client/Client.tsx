// -- ./src/components/DashboardPage/Client/Client/Client.tsx
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { timeTag } from 'src/lib/formatters'
import { ClientRole } from 'src/lib/type'
import { handleError } from 'src/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from 'src/template/ui/avatar'
import { DeleteClientMutationVariables, FindClientById } from 'types/graphql'

const DELETE_USER_MUTATION = gql`
  mutation DeleteClientMutation($id: String!) {
    deleteClient(id: $id) {
      id
    }
  }
`

interface Props {
  client: NonNullable<FindClientById['client']>
}

const Client = ({ client }: Props) => {
  const [deleteClient] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('Client deleted')
      navigate(routes.dashboardPageClients())
    },
    onError: (error) => {
      toast.error(handleError(error))
    },
  })

  const onDeleteClick = (id: DeleteClientMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete client ' + id + '?')) {
      deleteClient({ variables: { id } })
    }
  }

  return (
    <div className="mb-8 p-1 md:p-6">
      {/* Avatar Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8 gap-y-6">
        <div className="col-span-3 lmd:col-span-2 flex justify-center">
          <div className="w-40 h-40 lg:w-60 lg:h-60 mx-auto md:mx-0">
            <Avatar className="w-full h-full rounded-full shadow-md">
              <AvatarImage src={client.avatar || 'path-to-default-avatar.png'} />
              <AvatarFallback>
                {client.givenName?.[0] || 'N'}
                {client.familyName?.[0] || 'A'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Client Details Grid */}
        <div className="col-span-9 lmd:col-span-10 grid grid-cols-1 md:grid-cols-2 md:gap-x-8 gap-y-6">
          {/* Given Name */}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Given Name</span>
            <span className="text-gray-900">{client.givenName}</span>
          </div>

          {/* Family Name */}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Family Name</span>
            <span className="text-gray-900">{client.familyName}</span>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Email</span>
            <span className="text-gray-900">{client.email}</span>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Phone Number</span>
            <span className="text-gray-900">{client.phone || 'N/A'}</span>
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Gender</span>
            <span className="text-gray-900">{client.gender || 'N/A'}</span>
          </div>

          {/* Created At */}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Created At</span>
            <span className="text-gray-900">{timeTag(client.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-4 space-x-4">
        <Link
          to={routes.dashboardPageEditClient({ id: client.id })}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
        >
          Edit
        </Link>
        <button
          type="button"
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 transition"
          onClick={() => onDeleteClick(client.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Client
