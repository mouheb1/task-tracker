// -- ./src/pages/DashboardPage/Client/EditClientPage/EditClientPage.tsx
import EditClientCell from 'src/components/DashboardPage/Client/EditClientCell'

type ClientPageProps = {
  id: string
}

const EditClientPage = ({ id }: ClientPageProps) => {
  return <EditClientCell id={id} />
}

export default EditClientPage
