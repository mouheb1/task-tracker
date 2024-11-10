// -- ./src/pages/DashboardPage/Task/TaskPage/TaskPage.tsx
import TaskCell from 'src/components/DashboardPage/Task/TaskCell'

type TaskPageProps = {
  id: string
}

const TaskPage = ({ id }: TaskPageProps) => {
  return <TaskCell id={id} />
}

export default TaskPage
