"use client"

import React, { useEffect, useState } from 'react'

import SignUpFormSecondStep from '../components/forms/signup/SecondStep';
import { Button, buttonVariants } from '@/components/ui/fragments/shadcn-ui/button'
import { registerCreateSchema } from '@/lib/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod'
import { useOnboardingStore } from '@/hooks/use-store-signup'

import { ChevronLeft, ChevronRight, Loader } from 'lucide-react'
import Link from 'next/link';
import { cn } from '@/lib/utils'
import AuthLayoutTemplate from '../../layout/auth/auth-simple-layout';
import NavStepper from '@/components/ui/fragments/custom-ui/NavStepper';
import { usePathname, useRouter } from 'next/navigation';

const FormSecondStep = registerCreateSchema.pick({
  password: true,
  password_confirmation: true,
})
type FormSecondStepSchema = z.infer<typeof FormSecondStep>;

function SecondStep() {

  const [isClient, setIsClient] = useState(false);
  const password = useOnboardingStore((state) => state.password);
  const password_confirmation = useOnboardingStore((state) => state.password_confirmation);
  const useName = useOnboardingStore((state) => state.name);
  const userEmail = useOnboardingStore((state) => state.email);
  const hasHydrated = useOnboardingStore((state) => state._hasHydrated);
  const setData = useOnboardingStore((state) => state.setData);
const router = useRouter()
  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  
     const pathname = usePathname();
     React.useEffect(() => {
     setData({
      password: undefined,
      password_confirmation: undefined,
     })
  }, [pathname]) 



  const form = useForm<FormSecondStepSchema>({
    mode: "onSubmit", 
    defaultValues: {
      password: password || '',
      password_confirmation: password_confirmation || '',
    },
    resolver: zodResolver(FormSecondStep),
  })

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !hasHydrated) return;

    if (!useName || !userEmail) {
      router.push("/register");
    }
  }, [isClient, hasHydrated, useName, userEmail, router]);

  function onSubmit(input: FormSecondStepSchema) {
    try {
       
      setLoading(true)
      startTransition(async () => { 
        setData(input);
          router.push("/register/location" );
      })
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again." , {id: "register"});
    }
  }

  if (!isClient || !hasHydrated) {
    return (
      <AuthLayoutTemplate
       loading={loading} title='Create your password' description='Make a strong password - to protect your account' className=' lg:max-w-none h-dvh '>
        <div className="flex items-center justify-center py-8">
          <Loader className="animate-spin size-6" />
        </div>
      </AuthLayoutTemplate>
    );
  }

  return (
    <AuthLayoutTemplate loading={loading} title='Create your password' description='Make a strong password - to protect your account' className=' lg:max-w-none h-dvh '>
      <SignUpFormSecondStep form={form} isPending={isPending || loading} onSubmit={onSubmit}>
          <div className=" w-full space-y-5">

        <Button
          disabled={isPending || loading}
          type="submit"
          className="w-full  transition-colors"
        >
          Next 
          {(isPending || loading) ? (
            <Loader className='animate-spin ml-2'/>
          ) :   <ChevronRight className=' ml-2'/>}
        </Button>
 
                       
                <Link
                
                                href={'/register/'}
                                                         className={cn(buttonVariants({ variant: "link"} ,
                                                          
                                                         ), 'w-full  transition-colors')}
                            >
                               {( loading) ? (
                    <Loader className='animate-spin ml-2'/>
                  ) : <ChevronLeft className=' '/>}
                            Back
                        </Link>
               
          </div>
               <NavStepper curentActive={1}/>
      </SignUpFormSecondStep>
    </AuthLayoutTemplate>
  )
}

export default SecondStep