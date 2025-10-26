import { cn } from "@/lib/utils"
import React, { forwardRef } from "react"


type ContainerProps = {
  id: string
  children: React.ReactNode
  className?: string
  maxW?: boolean
  role?: string
  ariaLabel?: string
  dataTestId?: string
  sectionName?: string
  container?: string
  
} 

export default function Container({ container = "relative min-h-lvh    w-full content-center", id, maxW , role , ariaLabel , sectionName , dataTestId, children} : ContainerProps){
  return (
    <section
      id={id}
      className={cn(
        container, 
        maxW ? '' : 'p-7 md:p-10'
      )}
      role={role || "region"}
      aria-label={ariaLabel || sectionName || id}
      data-testid={dataTestId || `section-${id}`}
      data-section-name={sectionName || id}

    >
      <main 

        className={cn(
      
        )}
      >
        {children}
      </main>
    </section>
  )
}

Container.displayName = 'Container'

