// -- ./src/template/partials/sidebar/module/footer-menu.tsx
import React from 'react'
import { Settings } from 'src/template/svg'
import { useAuth } from 'src/auth'
import { Avatar, AvatarFallback, AvatarImage } from 'src/template/ui/avatar'

const FooterMenu = () => {
  const { currentUser } = useAuth()
  const { avatar } = currentUser
  return (
    <div className="space-y-5 flex flex-col items-center justify-center pb-6">
      <button className="w-11 h-11  mx-auto text-default-500 flex items-center justify-center  rounded-md transition-all duration-200 hover:bg-primary hover:text-primary-foreground">
        <Settings className=" h-8 w-8" />
      </button>
      <div>
        <Avatar>
          <AvatarImage height={36} width={36} src={avatar} />
          <AvatarFallback>CS</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
export default FooterMenu
