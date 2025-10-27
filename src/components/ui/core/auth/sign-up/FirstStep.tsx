"use client"

import React, { useEffect, useState } from 'react'

import SignUpFormFirstStep from '../components/forms/signup/FirstStep';
import { Button } from '@/components/ui/fragments/shadcn-ui/button'
import { registerCreateSchema } from '@/lib/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod'
import { useOnboardingStore } from '@/hooks/use-store-signup'

import { Loader } from 'lucide-react'
import AuthLayoutTemplate from '../../layout/auth/auth-simple-layout';
import NavStepper from '@/components/ui/fragments/custom-ui/NavStepper';

import { usePathname, useRouter } from 'next/navigation';


const FormFirstStep = registerCreateSchema.pick({
  name: true,
  email: true,
})
type FormFirstStepSchema = z.infer<typeof FormFirstStep>;


function FirstStep() {
    const name = useOnboardingStore((state) => state.name);
  const email = useOnboardingStore((state) => state.email);
const router = useRouter()

  const [isClient, setIsClient] = useState(false);
     const pathname = usePathname();
  const setData = useOnboardingStore((state) => state.setData);
  const hasHydrated = useOnboardingStore((state) => state._hasHydrated);

  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  
      React.useEffect(() => {
       setData({
        name: undefined,
        email: undefined,
       })
    }, [pathname]) 
  
  const form = useForm<FormFirstStepSchema>({
    mode: "onSubmit", 
    defaultValues: {
      email: email  || "",
      name: name || "",
    },
    resolver: zodResolver(FormFirstStep),
  })

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [isTyping, setIsTyping] = useState(false);
  function onSubmit(input: FormFirstStepSchema) {
    try {
      setLoading(true)
      startTransition(async () => { 
        setData(input);
        router.push("/register/password" );
      })
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again." ,  {id:" register"});
    } 
  }



  
  if (!isClient || !hasHydrated) {
    return (
      <AuthLayoutTemplate description='Mari kita mulai dengan nama lengkap dan alamat email Anda.' loading={loading} formType="register" title='Siapa namamu?' className=' lg:max-w-none h-lvh '>
        <div className="flex items-center justify-center py-8">
          <Loader className="animate-spin size-6" />
        </div>
      </AuthLayoutTemplate>
    );
  }

  return (
    <AuthLayoutTemplate  description='Mari kita mulai dengan nama lengkap dan alamat email Anda.'  loading={loading} formType="register" title='Siapa namamu?' className=' lg:max-w-none h-lvh '>
      <SignUpFormFirstStep setIsTyping={setIsTyping} form={form} isPending={(isPending || loading)} onSubmit={onSubmit}>
        <Button
          disabled={(isPending || loading)}
          type="submit"
          className="w-full  transition-colors"
        >
          Selanjutnya
          {(isPending || loading) && (
            <Loader className='animate-spin ml-2'/>
          )}
        </Button>
          <NavStepper curentActive={0}/>
      </SignUpFormFirstStep>
    </AuthLayoutTemplate>
  )
}

export default FirstStep