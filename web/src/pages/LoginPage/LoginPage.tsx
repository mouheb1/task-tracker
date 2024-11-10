// -- ./src/pages/LoginPage/LoginPage.tsx
import { useEffect, useRef } from 'react'

import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import LogInForm from 'src/template/auth/login-form'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.dashboard())
    }
  }, [isAuthenticated])

  const nameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await logIn({
      username: data.username,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <Metadata title="Login" />
      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="loginwrapper flex justify-center items-center relative overflow-hidden">
          <div className="w-full bg-background py-5 max-w-xl rounded-xl relative z-10 2xl:p-16 xl:p-12 p-10 m-4">
            <LogInForm onSubmit={onSubmit} nameRef={nameRef} />
          </div>
        </div>
        {/* <div className="rw-login-link">
          <span>Don&apos;t have an account?</span>{' '}
          <Link to={routes.signup()} className="rw-link">
            Sign up!
          </Link>
        </div> */}
      </main>
    </>
  )
}

export default LoginPage
