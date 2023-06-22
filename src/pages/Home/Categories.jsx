import React, { useEffect, useState } from 'react'
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import './home.scss'

export default function Categories() {
  const [isP, setIsP] = useState(false)
  // const [direction, setDirection] = useState('ltr');

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
      <div className='categories__carousel' key={categorie.name} style={{ background: `url(${img}) no-repeat`, backgroundSize: 'cover', height: '200px', width: '300px', backgroundPosition: 'center' }}>
      {/* <div className='categorie'> */}
        {/* <img src={img} style={{objectFit: 'cover', objectPosition: 'center' , height: '140px', width: '180px'}} alt='img'></img> */}
        <div className='categories__name'>{categorie.name}</div>
      </div >
    )
  });
  
  const carouselOptions = {
    autoPlay: true,
    autoPlayInterval: 3000,
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
      <div className='categories__carousel__wraper' >
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
              <div key={categorie.name} className='categorie' style={{ background: `url(${img}) no-repeat`, backgroundSize: 'cover', width: '180px', height: '180px', backgroundPosition: 'center' }}>
              {/* <div className='categorie'> */}
                {/* <img src={img} style={{objectFit: 'cover', objectPosition: 'center' , height: '140px', width: '180px'}} alt='img'></img> */}
                <div className='categories__name'>{categorie.name}</div>
              </div>
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
    photo: '../../assets/images/phones_category.jpg'
  },
  {
    name: 'PC and Laptops',
    photo: '../../assets/images/laptops_category.webp'
  },
  {
    name: 'Other electronics',
    photo: '../../assets/images/other-electronics2_category.webp'
  },
  {
    name: 'Instruments',
    photo: '../../assets/images/instruments_category.jpg'
  },
  {
    name: 'Clothes',
    photo: '../../assets/images/clothes_category.webp'
  },
  {
    name: 'Other goods',
    photo: '../../assets/images/other_category.jpg'
  },
]
