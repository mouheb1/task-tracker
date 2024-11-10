// -- ./src/layouts/ScaffoldLayout/ScaffoldLayout.tsx
import { Icon } from '@iconify/react/dist/iconify.js'
import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import { Button } from 'src/template/ui/button'

type LayoutProps = {
  title: string
  titleTo: keyof typeof routes
  buttonLabel: string
  buttonTo: keyof typeof routes
  children: React.ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <div className="flex flex-wrap gap-4 items-center justify-between mb-2">
        {titleTo && <div className="text-2xl font-medium text-default-800">
          <Link to={routes[titleTo]()} className="rw-link">
            {title}
          </Link>
        </div>}
        {buttonTo && <Link to={routes[buttonTo]()} className="rw-button rw-button-green">
          <Button className="w-full">
            <Icon
              icon="heroicons:plus"
              className="w-6 h-6 mr-2"
            />
            {buttonLabel}
          </Button>
        </Link>}
      </div>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ScaffoldLayout
