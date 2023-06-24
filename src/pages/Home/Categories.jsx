import React, { useEffect, useState } from 'react'
import { checkTheme } from '../../components/DarkMode/DarkMode'
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import './home.scss'
import { Link } from 'react-router-dom';

export default function Categories() {
  const [isP, setIsP] = useState(false)
  // const [direction, setDirection] = useState('ltr');

  checkTheme()

  useEffect(() => {
    if (window.innerWidth < 480) {
      setIsP(true);
    }

    const handleResize = () => {
      if (window.innerWidth < 480) {
        setIsP(true);
      } else {
        setIsP(false)
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const items = categories.map((categorie) => {
    const img = categorie.photo
    return (
      <Link key={categorie.name} to={categorie.link} style={{ textDecoration: 'none'}}>
        <div className='categories__carousel' style={{ background: `url(${img}) no-repeat`, backgroundSize: 'cover', height: '200px', width: '300px', backgroundPosition: 'center' }}>
        {/* <div className='categorie'> */}
          {/* <img src={img} style={{objectFit: 'cover', objectPosition: 'center' , height: '140px', width: '180px'}} alt='img'></img> */}
          <div className='categories__name'>{categorie.name}</div>
        </div >
      </Link>
    )
  });
  
  const carouselOptions = {
    // autoPlay: true,
    // autoPlayInterval: 3000,
    // disableDotsControls: true,
    buttonsInBlock: true,
    disableButtonsControls: true,
    // direction: direction,
    // onSlideChanged: ({ __, item }) => {
    //   if (item === items.length - 1) {
    //     setDirection((prevDirection) => (prevDirection === 'ltr' ? 'rtl' : 'ltr'));
    //   }
    // },
  };

  if (isP) {
    return (
      <div className='categories__carousel__wraper'>
        <AliceCarousel items={items} mouseTracking controlsStrategy="alternate" { ...carouselOptions }></AliceCarousel>
      </div>
    )
  }

  return (
    <>
      <div className='categories'>
        {
          categories.map(categorie => {
            const img = categorie.photo
            return (
              <Link key={categorie.name} to={categorie.link} style={{textDecoration: 'none'}}>
                <div className='categorie' style={{ background: `url(${img}) no-repeat`, backgroundSize: 'cover', width: '180px', height: '180px', backgroundPosition: 'center' }}>
                {/* <div className='categorie'> */}
                  {/* <img src={img} style={{objectFit: 'cover', objectPosition: 'center' , height: '140px', width: '180px'}} alt='img'></img> */}
                  <div className='categories__name'>{categorie.name}</div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </>
  )
}

const categories = [
  {
    name: 'Phones and Tablets',
    photo: '../../assets/images/phones_category.jpg',
    link: '/category/phone'
  },
  {
    name: 'PC and Laptops',
    photo: '../../assets/images/laptops_category.webp',
    link: '/category/pc'
  },
  {
    name: 'Other electronics',
    photo: '../../assets/images/other-electronics2_category.webp',
    link: '/category/electronic'
  },
  {
    name: 'Instruments',
    photo: '../../assets/images/instruments_category.jpg',
    link: '/category/instrument'
  },
  {
    name: 'Clothes',
    photo: '../../assets/images/clothes_category.webp',
    link: '/category/clothes'
  },
  {
    name: 'Other goods',
    photo: '../../assets/images/other_category.jpg',
    link: '/category/other'
  },
]
