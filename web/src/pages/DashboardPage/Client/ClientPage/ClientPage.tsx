// -- ./src/pages/DashboardPage/Client/ClientPage/ClientPage.tsx
import ClientCell from 'src/components/DashboardPage/Client/ClientCell'

type ClientPageProps = {
  id: string
}

const ClientPage = ({ id }: ClientPageProps) => {
  return <ClientCell id={id} />
}

export default ClientPage
