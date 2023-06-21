import React from 'react'
import './home.scss'

export default function Categories() {
  return (
    <div className='categories'>
      {
        categories.map(categorie => {
          const img = categorie.photo
          return (
            <div className='categorie' style={{ background: `url(${img}) no-repeat`, backgroundSize: 'cover', width: '180px', height: '180px', backgroundPosition: 'center' }}>
              <div className='categories__name'>{categorie.name}</div>
            </div>
          )
        })
      }
    </div>
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
