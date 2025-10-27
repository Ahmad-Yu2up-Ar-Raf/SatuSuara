import React from 'react'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/fragments/shadcn-ui/form"
import {
    FieldPath,
    FieldValues,
  UseFormReturn
} from "react-hook-form"
;
import { PasswordInput } from '@/components/ui/fragments/custom-ui/input/password-input';

interface TaskFormProps<T extends FieldValues, >
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
     
      setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
}

function SignUpFormSecondStep<T extends FieldValues, >({
    form,
    isPending,
...props
}: TaskFormProps<T>) {
  return (
   <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)} className="  space-y-6 *:

      
  [&_input]:text-xs [&_input]:w-full [&_input]:py-2 [&_input]:px-3 [&_input]:border [&_input]:rounded-xl [&_input]:focus:outline-none [&_input]:focus:ring-1 [&_input]:bg-background [&_input]:text-accent-foreground [&_input]:focus:ring-primary
      ">
      

     
        <FormField
         disabled={isPending}
          control={form.control}
    name={"password" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sandi</FormLabel>
              <FormControl>
                <PasswordInput placeholder="sandi" 
                {...field}
                     onBlur={() => props.setIsTyping(false)}
                        onFocus={() => props.setIsTyping(true)} 
                        
                        />
              </FormControl>
              <FormDescription  className=' sr-only '>Enter your password.</FormDescription>
              <FormMessage  className=' '/>
            </FormItem>
          )}
        />
        <FormField
         disabled={isPending}
          control={form.control}
    name={"password_confirmation" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>konfirmasi sandi</FormLabel>
              <FormControl>
                <PasswordInput placeholder="konfirmasi" {...field} />
              </FormControl>
              <FormDescription  className='sr-only '>Enter your password.</FormDescription>
              <FormMessage  className=' '/>
            </FormItem> 
          )}
        />

        {props.children}
        </form>
    </Form>
  )
}

export default SignUpFormSecondStep


