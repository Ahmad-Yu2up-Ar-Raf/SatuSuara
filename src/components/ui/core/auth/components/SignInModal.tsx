"use client"

import React, { useEffect} from 'react'
import AuthLayoutTemplate from '../../layout/auth/auth-simple-layout';


import { loginSchema, LoginSchema } from '@/lib/validations/auth';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';



import {
  Dialog,

  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/fragments/shadcn-ui/dialog"
import { useModal } from '../../providers/ContextProvider';
import { cn } from '@/lib/utils'
import SignInForm from './forms/SignInForm';
import { Button } from '@/components/ui/fragments/shadcn-ui/button';
import { Loader } from 'lucide-react';



function SignInModal({ className }: { className?: string}) {

  const { isOpen, close, payload } = useModal();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);
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


  function onSubmit(input: LoginSchema ) {
    try {
          toast.loading("Login....", {id: "login"});
                setLoading(true)
        startTransition(async () => { 

        })
 
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }



  return (
        <Dialog    onOpenChange={close}  open={isOpen}  >
       
      <DialogContent 

        className={cn("overflow-hidden  w-full p-0  h-full  justify-between border-0 lg:max-w-[76em] ", className)}
      >
         <DialogHeader className=' sr-only'>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
            <AuthLayoutTemplate formType="login" loading={loading} title="Log in to your account" description="Masukkan email dan kata sandi Anda di bawah ini untuk masuk" className=' h-full lg:max-w-[76em]'>
         
      <SignInForm form={form} isPending={isPending || loading} onSubmit={onSubmit}>
      <Button
          disabled={isPending || loading}
          type="submit"
          className="w-full  transition-colors"
        >
          Masuk
          {(isPending || loading) && (
            <Loader className='animate-spin ml-2'/>
          )}
        </Button>
      </SignInForm>

            {status && <div className="mb-4 text-center text-sm font-medium text-yellow-600">{status}</div>}
        </AuthLayoutTemplate>
              
      </DialogContent>
    </Dialog>

  )
}

export default SignInModal
