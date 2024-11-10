// -- ./src/layouts/DashboardLayout/DashboardLayout.tsx
import { useState } from 'react'
import React from 'react'
import Header from 'src/template/partials/header'
import Sidebar from 'src/template/partials/sidebar'
import { cn } from 'src/lib/utils'
import { useSidebar } from 'src/store'
import Footer from 'src/template/partials/footer'
import { useMediaQuery } from 'src/hooks/use-media-query'

type DashboardLayoutProps = {
  children?: React.ReactNode
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const { collapsed } = useSidebar()
  const [open, setOpen] = React.useState(false)
  // const location = usePathname();
  const isMobile = useMediaQuery('(min-width: 768px)')

  const [visible, setVisible] = useState(false)


  return (
    <>
      <Header handleOpenSearch={() => setOpen(true)} />
      <Sidebar />

      <div
        className={cn("content-wrapper transition-all duration-150 ", {
          "ltr:xl:ml-[300px] rtl:xl:mr-[300px]": !collapsed,
          "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,
        })}
      >
        <div
          className={cn(
            " layout-padding px-6 pt-6  page-min-height ",

          )}
        >
          <LayoutWrapper
            isMobile={isMobile}
            setOpen={setOpen}
            open={open}
          >
            {children}
          </LayoutWrapper>
        </div>
      </div>
      <Footer handleOpenSearch={() => setOpen(true)} />
    </>

  )

}

const LayoutWrapper = ({
  children,
  setOpen,
  open,
}: {
  children: React.ReactNode
  isMobile: boolean
  setOpen: any
  open: boolean
}) => {
  return (
    <>
      <div>
        <main>{children}</main>
      </div>

      {/* <HeaderSearch open={open} setOpen={setOpen} /> */}
    </>
  )
}

export default DashboardLayout
