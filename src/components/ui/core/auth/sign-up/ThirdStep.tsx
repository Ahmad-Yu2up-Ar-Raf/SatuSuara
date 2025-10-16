"use client"

import React, { useEffect, useState } from 'react'

import SignUpFormThirdStep from '../components/forms/signup/ThirdStep';
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

const FormThirdStep = registerCreateSchema.pick({
  country: true,
  province: true,
  phone: true,
})
type FormThirdStepSchema = z.infer<typeof FormThirdStep>;

function ThirdStep() {
 
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const country = useOnboardingStore((state) => state.country); 
  const province = useOnboardingStore((state) => state.province); 
  const phone = useOnboardingStore((state) => state.phone);
  const password = useOnboardingStore((state) => state.password);
  const password_confirmation = useOnboardingStore((state) => state.password_confirmation);
  const useName = useOnboardingStore((state) => state.name);
  const userEmail = useOnboardingStore((state) => state.email);
  const hasHydrated = useOnboardingStore((state) => state._hasHydrated);
  const setData = useOnboardingStore((state) => state.setData);

  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  
     const pathname = usePathname();
     React.useEffect(() => {
     setData({
      country: undefined,
      phone: undefined,
      province: undefined,
     })
  }, [pathname]) 



  const form = useForm<FormThirdStepSchema>({
    mode: "onSubmit", 
    defaultValues: {
      country: country || 'Indonesia',
      province: province || '',
      phone: phone || '',
    },
    resolver: zodResolver(FormThirdStep),
  })

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !hasHydrated) return;

    if (!useName || !userEmail || !password || !password_confirmation) {
      router.push("/register/password");
    }
  }, [isClient, hasHydrated, useName, userEmail, router]);

  function onSubmit(input: FormThirdStepSchema) {
    try {
     
      setLoading(true)
      startTransition(async () => { 
        setData(input);
          router.push("/register/occupasion" );
      })
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again." , {id: "register"});
    }
  }

  if (!isClient || !hasHydrated) {
    return (
      <AuthLayoutTemplate
       loading={loading} title='Where Are You From?' description='Fill in your country, province, and phone number.' className=' lg:max-w-none h-dvh '>
        <div className="flex items-center justify-center py-8">
          <Loader className="animate-spin size-6" />
        </div>
      </AuthLayoutTemplate>
    );
  }

  return (
    <AuthLayoutTemplate loading={loading} title='Where Are You From?' description='Fill in your country, province, and phone number.' className=' lg:max-w-none h-dvh '>
      <SignUpFormThirdStep form={form} isPending={isPending || loading} onSubmit={onSubmit}>
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
               <NavStepper curentActive={2}/>
      </SignUpFormThirdStep>
    </AuthLayoutTemplate>
  )
}

export default ThirdStep