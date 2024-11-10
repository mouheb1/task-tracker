// -- ./src/template/partials/header/index.tsx
'use client'
import React from 'react'
import ThemeButton from './theme-button'
import ProfileInfo from './profile-info'
import VerticalHeader from './vertical-header'
import Inbox from './inbox'
import NotificationMessage from './notification-message'

import { useMediaQuery } from 'src/hooks/use-media-query'
import ClassicHeader from './layout/classic-header'
import FullScreen from './full-screen'
import { cn } from 'src/lib/utils'
import { useSidebar } from 'src/store'

const NavTools = ({ isDesktop }: { isDesktop: boolean }) => {
  return (
    <div className="nav-tools flex items-center  gap-2">
      {/* {isDesktop && <FullScreen />}

      <ThemeButton />
      <Inbox />
      <NotificationMessage /> */}

      <div className="ltr:pl-2 rtl:pr-2">
        <ProfileInfo />
      </div>
    </div>
  )
}


const Header = ({ handleOpenSearch }: { handleOpenSearch: () => void }) => {
  const { collapsed } =
    useSidebar();

  const isDesktop = useMediaQuery("(min-width: 1280px)");



  return (
    <ClassicHeader
      className={cn("", {
        "ltr:xl:ml-[300px] rtl:xl:mr-[300px]": !collapsed,
        "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,

        "sticky top-0": "sticky" === "sticky",

      })}
    >
      <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 border-b">
        <div className="flex justify-between items-center h-full">
          <VerticalHeader
            handleOpenSearch={handleOpenSearch}
          />
          <NavTools
            isDesktop={isDesktop}
          />
        </div>
      </div>
    </ClassicHeader>
  );
};


export default Header
