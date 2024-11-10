// -- ./src/pages/DashboardPage/Task/EditTaskPage/EditTaskPage.tsx
import EditTaskCell from 'src/components/DashboardPage/Task/EditTaskCell'

type TaskPageProps = {
  id: string
}

const EditTaskPage = ({ id }: TaskPageProps) => {
  return <EditTaskCell id={id} />
}

export default EditTaskPage
