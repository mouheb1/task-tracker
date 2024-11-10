'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from 'src/template/ui/button'
import { Input } from 'src/template/ui/input'
import { Label } from 'src/template/ui/label'
import { Loader2 } from 'lucide-react'
import { toast } from '@redwoodjs/web/toast' // Ensure toast is from RedwoodJS
import { cn } from 'src/lib/utils'
import { Link, routes } from '@redwoodjs/router'
import { Icon } from '@iconify/react'
import { Checkbox } from 'src/template/ui/checkbox'

import { SiteLogo } from 'src/template/svg'
import { useMediaQuery } from 'src/hooks/use-media-query' // Ensure this hook exists

const schema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(4, { message: 'Password must be at least 4 characters' }),
})

interface LogInFormProps {
  onSubmit: (data: Record<string, any>) => Promise<boolean> // Change to Promise<boolean>
  usernameRef: React.RefObject<HTMLInputElement>
}

const LogInForm: React.FC<LogInFormProps> = ({ onSubmit, usernameRef }) => {
  const [isPending, setIsPending] = React.useState(false)
  const [passwordType, setPasswordType] = React.useState('password')
  const isDesktop2xl = useMediaQuery('(max-width: 1530px)')

  const togglePasswordType = () => {
    setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: null, // zodResolver(schema),
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
      isRemembered: false
    },
  })

  useEffect(() => {
    if (usernameRef) {
      usernameRef.current?.focus()
    }
  }, [usernameRef])

  const internalOnSubmit = async (data: { username: string; password: string; isRemembered: boolean }) => {
    setIsPending(true)
    try {
      const success = await onSubmit(data)
      if (success) {
        toast.success('Login successful')
        reset() // Only reset when login is successful
      }
      // else {
      //   toast.error('Invalid credentials')
      // }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Something went wrong')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="w-full py-10">
      <Link to={routes.dashboard()} className="inline-block">
        <SiteLogo className="h-10 w-10 2xl:w-14 2xl:h-14 text-primary" />
      </Link>
      {/*
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Hey, Hello 👋
      </div>
      <div className="2xl:text-lg text-base text-default-600 2xl:mt-2 leading-6">
        Enter the information you entered while registering.
      </div>
      */}
      <form onSubmit={handleSubmit(internalOnSubmit)} className="mt-5 2xl:mt-7">
        <div>
          <Label htmlFor="username" className="mb-2 font-medium text-default-600">
            Username
          </Label>
          <Input
            disabled={isPending}
            {...register('username')}
            type="text"
            id="username"
            className={cn('', {
              'border-destructive': errors.username,
            })}
            size={!isDesktop2xl ? 'xl' : 'lg'}
            // ref={usernameRef} // If you want to attach the ref, uncomment this line
          />
        </div>
        {errors.username && (
          <div className="text-destructive mt-2">{errors.username.message}</div>
        )}

        <div className="mt-3.5">
          <Label
            htmlFor="password"
            className="mb-2 font-medium text-default-600"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              disabled={isPending}
              {...register('password')}
              type={passwordType}
              id="password"
              className="peer"
              size={!isDesktop2xl ? 'xl' : 'lg'}
              placeholder=" "
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
              onClick={togglePasswordType}
            >
              {passwordType === 'password' ? (
                <Icon
                  icon="heroicons:eye"
                  className="w-5 h-5 text-default-400"
                />
              ) : (
                <Icon
                  icon="heroicons:eye-slash"
                  className="w-5 h-5 text-default-400"
                />
              )}
            </div>
          </div>
        </div>
        {errors.password && (
          <div className="text-destructive mt-2">
            {errors.password.message}
          </div>
        )}

        <div className="mt-5 mb-8 flex flex-wrap gap-2">
          {/* <div className="flex-1 flex items-center gap-1.5">
            <Checkbox
              size="sm"
              className="border-default-300 mt-[1px]"
              id="isRemebered"
              {...register('isRemembered')}
            />
            <Label
              htmlFor="isRemebered"
              className="text-sm text-default-600 cursor-pointer whitespace-nowrap"
            >
              Remember me
            </Label>
          </div>
          <Link to={routes.forgotPassword()} className="flex-none text-sm text-primary">
            Forgot Password?
          </Link> */}
        </div>
        <Button
          className="w-full"
          disabled={isPending}
          size={!isDesktop2xl ? 'lg' : 'md'}
          type="submit"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? 'Loading...' : 'Sign In'}
        </Button>
      </form>
      {/*
      <div className="mt-6 xl:mt-8 flex flex-wrap justify-center gap-4">
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full  border-default-300 hover:bg-transparent"
          disabled={isPending}
          onClick={() => console.log('google')}
        >
          <img src={googleIcon} alt="google" className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full  border-default-300 hover:bg-transparent"
          disabled={isPending}
          onClick={() => console.log('github')}
        >
          <img src={GithubIcon} alt="github" className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full border-default-300 hover:bg-transparent"
          disabled={isPending}
          onClick={() => console.log('facebook')} // Added redirect
        >
          <img src={facebook} alt="facebook" className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full  border-default-300 hover:bg-transparent"
          disabled={isPending}
          onClick={() => console.log('twitter')} // Added redirect
        >
          <img src={twitter} alt="twitter" className="w-5 h-5" />
        </Button>
      </div>
      <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
        Don't have an account?{' '}
        <Link to={routes.signup()} className="text-primary">
          Sign Up
        </Link>
      </div>
      */}
    </div>
  )
}

export default LogInForm
