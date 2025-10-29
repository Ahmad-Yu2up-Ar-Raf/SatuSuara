"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "../../shadcn-ui/button"
import { Card } from "../../shadcn-ui/card"
import { MessageCircle } from "lucide-react"

interface Testimonial {
  image: string
  name: string
  username: string
  text: string
  social?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  className?: string
  title?: string
  description?: string
  maxDisplayed?: number
}

export function InovasiTestimonials({
  testimonials,
  className,
  title = "Apa Kata Mereka",
  description = "Dengarkan langsung dari masyarakat yang merasakan dampak positif inovasi ini",
  maxDisplayed = 6,
}: TestimonialsProps) {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className={className}>
      <div className="flex flex-col items-center justify-center pt-5">
        <div className="flex flex-col gap-5 mb-8">
          <div className="flex items-center justify-center gap-3">
            <MessageCircle className="w-8 h-8 text-primary" />
            <h2 className="text-center text-3xl md:text-4xl font-bold">{title}</h2>
          </div>
          <p className="text-center text-muted-foreground  mx-auto">
            {description.split("<br />").map((line, i) => (
              <span key={i}>
                {line}
                {i !== description.split("<br />").length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          className={cn(
            "flex justify-center items-start gap-5 flex-wrap",
            !showAll &&
              testimonials.length > maxDisplayed &&
              "max-h-[720px] overflow-hidden",
          )}
        >
          {testimonials
            .slice(0, showAll ? undefined : maxDisplayed)
            .map((testimonial, index) => (
              <Card
                key={index}
                className="w-full sm:w-80 h-auto p-5 relative bg-card border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <div className="flex flex-col pl-4">
                    <span className="font-semibold text-base">
                      {testimonial.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {testimonial.username}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-foreground leading-relaxed text-sm">
                    "{testimonial.text}"
                  </p>
                </div>
              </Card>
            ))}
        </div>

        {testimonials.length > maxDisplayed && !showAll && (
          <>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
              <Button 
                variant="default" 
                onClick={() => setShowAll(true)}
                className="shadow-lg"
              >
                Lihat Semua Komentar
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}


