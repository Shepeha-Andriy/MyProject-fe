import React from 'react'
import { checkTheme } from '../../components/DarkMode/DarkMode'
import { Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.scss'

export default function Promotions() {

  checkTheme()

  return (
    <div className='promotions'>
      <Carousel touch>
        <Carousel.Item className=''>
          <img className='promotions__img' src='../../assets/images/phones_category.jpg' alt='img'></img>
          <Carousel.Caption><h3>Hello</h3></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className=''>
          <img className='promotions__img' src='../../assets/images/phones_category.jpg' alt='img'></img>
          <Carousel.Caption><h3>Hello</h3></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className=''>
          <img className='promotions__img' src='../../assets/images/phones_category.jpg' alt='img'></img>
          <Carousel.Caption><h3>Hello</h3></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}
