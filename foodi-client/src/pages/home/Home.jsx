import React from 'react'
import Categories from './Categories'
import Banner from '../../components/Banner'
import SpecialDishes from './SpecialDishes'
import Testimonials from './Testimonials'
import OurServices from './OurServices'
import Footer from '../../components/Footer'


const Home = () => {
  return (
    <div>
      <Banner/>
      <Categories/>
      <SpecialDishes/>
      <Testimonials/>
      <OurServices/>
    </div>
  )
}

export default Home