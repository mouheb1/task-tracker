// -- ./src/template/error-block.tsx
'use client'
// import Image from 'next/image'

import { Link, routes } from '@redwoodjs/router'

import darkImage from 'src/public/images/error/dark-404.png'
import lightImage from 'src/public/images/error/light-404.png'
import { Button } from 'src/template/ui/button'

const ErrorBlock = () => {
  return (
    <div className="min-h-screen  overflow-y-auto flex justify-center items-center p-10">
      <div className="w-full flex flex-col items-center">
        <div className="max-w-[740px]">
          <img
            // src={theme === 'dark' ? darkImage : lightImage}
            src={lightImage}
            alt="error image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-16 text-center">
          <div className="text-2xl md:text-4xl lg:text-5xl font-semibold text-default-900">
            Ops! Page Not Found
          </div>
          <div className="mt-3 text-default-600 text-sm md:text-base">
            The page you are looking for might have been removed had <br /> its
            name changed or is temporarily unavailable.
          </div>
          <Button asChild className="mt-9  md:min-w-[300px]" size="lg">
            <Link to={routes.home()} >Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorBlock
