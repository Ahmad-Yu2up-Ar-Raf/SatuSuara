import React from 'react'
import { Input } from '../../fragments/shadcn-ui/input'
import { Button } from '../../fragments/shadcn-ui/button'
import Link from 'next/link'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../fragments/shadcn-ui/card'

function Neslatter() {
  return (
    <section className=" container   py-10 sm:px-10 px-5   space-y-7">

<Card className="w-full flex flex-col justify-center rounded-xl bg-primary/20  relative md:py-15 py-17 md:text-center m-auto gap-8">
       <CardHeader className="gap-5 md:justify-center m-auto w-full">
            <CardTitle className="text-4xl font-serif! leading-9 font-bold">
              Jangan Lewatkan Inovasi Terbaru
            </CardTitle>
            <CardDescription className="text-balance  line-clamp-2 text-xs font-medium text-accent-foreground">
              Dapatkan update tentang inovasi terbaru, kisah sukses, dan peluang kolaborasi langsung di inbox Anda.
            </CardDescription>
          </CardHeader>
      <CardContent className="flex items-center md:justify-center justify-start col-span-2 px-4.5">
          <form className="grid gap-8">
            <div className="flex w-full max-w-xs md:max-w-md md:m-auto items-center space-x-2">
              <Input
                type="email"
                placeholder="email@contoh.com"
                name="email"
                required
                className='bg-background rounded-xl w-full placeholder:text-xs'
                aria-label="Alamat email Anda"
              />
              <CardAction>    
                <Button type="submit" className='text-xs'>Berlangganan</Button>
              </CardAction>
            </div>
          </form>
      </CardContent>
      <CardFooter className='max-w-lg gap-3 md:justify-center m-auto w-full'>
            <p className="text-[10.5px] line-clamp-4 leading-3.5 text-accent-foreground">
              Dengan berlangganan, Anda setuju menerima newsletter dari SatuSuara. Anda dapat berhenti berlangganan kapan saja melalui link yang tersedia di setiap email. Pelajari lebih lanjut di
              <Link
                href='/kebijakan-privasi'
                className='text-muted-foreground underline'
              >
                {" "}kebijakan privasi
              </Link>
              {" "}kami.
            </p>
      </CardFooter>
    </Card>
    </section>
  
  )
}

export default Neslatter
