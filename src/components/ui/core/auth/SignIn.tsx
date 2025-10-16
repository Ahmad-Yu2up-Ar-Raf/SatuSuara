"use client"

import React, { useState } from 'react'

import SignInForm from './components/forms/SignInForm'
import { Button } from '../../fragments/shadcn-ui/button';

import { loginSchema, LoginSchema } from '@/lib/validations/auth';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Loader } from 'lucide-react';
import AuthLayoutTemplate from '../layout/auth/auth-simple-layout';





function SignIn() {

  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  



 const form = useForm<LoginSchema> ({
        mode: "onSubmit", 
    defaultValues: {
       email: "",
       password: "",
       remember_token: false
      },
    resolver: zodResolver(loginSchema),
  })
  const [errors, setErrors] = useState<string[]>([])
  const [status, setStatus] = useState<string | null>(null)


  async function onSubmit(input: LoginSchema) {
    try {
      setLoading(true)
      toast.loading("Signing in...", { id: "login" })
      
      // const result = await login({
      //   ...input,

  
      // })

      // if (result.success) {
      //   toast.success(result.message || "Welcome back!", { id: "login" })
      // } else {
      //   toast.error(result.message || "Login failed", { id: "login" })
      // }
    } catch (error) {
      console.error("Form submission error", error)
      toast.error("Network error. Please check your connection.", { id: "login" })
    } finally {
      setLoading(false)
    }
  }



 React.useEffect(() => {
    if (!loading && status) {
      form.reset()
    }
  }, [loading, status, form]);


  return (
    <AuthLayoutTemplate  loading={loading} numberOfIterations={10}  formType="login" className=' lg:max-w-none h-dvh '>
      <SignInForm form={form} isPending={isPending || loading} onSubmit={onSubmit}>
      <Button
          disabled={isPending || loading}
          type="submit"
          className="w-full  transition-colors"
        >
          Sign In
          {(isPending || loading) && (
            <Loader className='animate-spin ml-2'/>
          )}
        </Button>
      </SignInForm>
    </AuthLayoutTemplate>
  )
}

export default SignIn
