import React from 'react'
import ScrollVelocity from '../../fragments/custom-ui/animate-ui/marquee-along'

function Marque() {
  return (
    <section className=' md:min-h-[29svh] content-center'>

        <ScrollVelocity
        texts={['SatuSuara' , "SatuSuara"]} 

        className="custom-scroll-text"
      />
    </section>

  )
}

export default Marque