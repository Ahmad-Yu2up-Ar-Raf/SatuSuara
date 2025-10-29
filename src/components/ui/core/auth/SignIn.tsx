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
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/hooks/use-store-signup';





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

  const [status, setStatus] = useState<string | null>(null)
  const setData = useOnboardingStore((state) => state.setData);
const router = useRouter()
  async function onSubmit(input: LoginSchema) {
      const postBody = {
      ...input,
      name : "guest user",
      password_confirmation : input.password,
      occupasion: "student",
      country : "Indonesia",
      province : "DKI Jakarta",
      phone : "081234567890"
    }
    try {
      setLoading(true)
      
      setData(postBody);
      router.push("/dashboard" );
      toast.success("Selamat Datang", { id: "login" })
    } catch (error) {
      console.error("Form submission error", error)
      toast.error("Network error. Please check your connection.", { id: "login" })
    } finally {
      setLoading(false)
    }
  }
  const [isTyping, setIsTyping] = useState(false);


 React.useEffect(() => {
    if (!loading && status) {
      form.reset()
    }
  }, [loading, status, form]);


  return (
    <AuthLayoutTemplate  loading={loading} numberOfIterations={10}  formType="login" className=' lg:max-w-none h-lvh '>
      <SignInForm  form={form} isPending={isPending || loading} onSubmit={onSubmit}>
      <Button
          disabled={isPending || loading}
          type="submit"
          className="w-full  mb-5 transition-colors"
        >
          Masuk
          {(isPending || loading) && (
            <Loader className='animate-spin ml-2'/>
          )}
        </Button>
      </SignInForm>
    </AuthLayoutTemplate>
  )
}

export default SignIn
