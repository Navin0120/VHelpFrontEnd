import React from 'react'
import CardComponent from './Cards/CardComponent'
import CarouselComponent2 from './carousel/CarouselComponent2'
import FooterComponent from './Footer/FooterComponent copy'

import { Navbar } from './NewComponents/Navbar'

export default function HomePage() {
  
  return (
    <>
        <Navbar/>
        <CarouselComponent2/>
        <CardComponent/>
        <FooterComponent/>
    </>
  )
}
