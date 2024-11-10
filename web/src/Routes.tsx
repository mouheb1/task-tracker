// -- ./src/Routes.tsx
// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, PrivateSet } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import { useAuth } from './auth'
import DashboardLayout from 'src/layouts/DashboardLayout/DashboardLayout'
import { ClientRole } from './lib/type'

const Routes = () => {

  return (
    <Router useAuth={useAuth}>
      <PrivateSet unauthenticated="login">

        <Set wrap={DashboardLayout}>
          {/* <Route path="/" page={HomePage} name="home" /> */}
          <Route path="/dashboard" page={DashboardPage} name="dashboard" />

          {/* Routes For ADMIN */}
          <PrivateSet unauthenticated='home' roles={[ClientRole.ADMIN]}>

            <Set wrap={ScaffoldLayout} title="Tasks" titleTo="dashboardPageTasks" buttonLabel="New Task" buttonTo="dashboardPageNewTask">
              <Route path="/dashboard/tasks/new" page={DashboardPageTaskNewTaskPage} name="dashboardPageNewTask" />
              <Route path="/dashboard/tasks/{id}/edit" page={DashboardPageTaskEditTaskPage} name="dashboardPageEditTask" />
              <Route path="/dashboard/tasks/{id}" page={DashboardPageTaskTaskPage} name="dashboardPageTask" />
              <Route path="/dashboard/tasks" page={DashboardPageTaskTasksPage} name="dashboardPageTasks" />
            </Set>

            {/* Clients */}
            <Set wrap={ScaffoldLayout} title="Clients" titleTo="dashboardPageClients" buttonLabel="New Client" buttonTo="dashboardPageNewClient">
              <Route path="/dashboard/clients/new" page={DashboardPageClientNewClientPage} name="dashboardPageNewClient" />
              <Route path="/dashboard/clients/{id}/edit" page={DashboardPageClientEditClientPage} name="dashboardPageEditClient" />
              <Route path="/dashboard/clients/{id}" page={DashboardPageClientClientPage} name="dashboardPageClient" />
              <Route path="/dashboard/clients" page={DashboardPageClientClientsPage} name="dashboardPageClients" />
            </Set>

          </PrivateSet>

          {/* Routes For STUDENT */}
          {/* <PrivateSet unauthenticated='home' roles={[ClientRole.EMPLOYEE]}>
            <Route path="/student/portal/timetable" page={PortalPageStudentSchedualSchedualPage} name="portalPageStudentSchedualSchedual" />

            <Set wrap={ScaffoldLayout} title="AttendancesHistory" titleTo="portalPageStudentAttendanceAttendancesHistory" buttonLabel={null} buttonTo={null}>
              <Route path="/student/portal/attendance-history/{id}" page={PortalPageStudentAttendanceAttendanceHistoryPage} name="portalPageStudentAttendanceAttendanceHistory" />
              <Route path="/student/portal/attendances-history" page={PortalPageStudentAttendanceAttendancesHistoryPage} name="portalPageStudentAttendanceAttendancesHistory" />
            </Set>

            <Set wrap={ScaffoldLayout} title="Tasks" titleTo="portalPageStudentTasks" buttonLabel={null} buttonTo={null}>
              <Route path="/student/portal/tasks/{id}" page={PortalPageStudentTaskTaskPage} name="portalPageStudentTask" />
              <Route path="/student/portal/tasks" page={PortalPageStudentTaskTasksPage} name="portalPageStudentTasks" />
            </Set>

          </PrivateSet> */}

        </Set>

      </PrivateSet>
      <Route path="/login" page={LoginPage} name="login" />
      {/* <Route path="/signup" page={SignupPage} name="signup" /> */}
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
    </Router >
  )
}

export default Routes
