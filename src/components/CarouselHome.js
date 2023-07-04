import React from 'react'
import { Carousel } from 'react-bootstrap'
import img1 from '../assets/carousel1.png'
import img2 from '../assets/carousel2.png'
import img3 from '../assets/carousel3.png'
import '../App.css';

const CarouselHome = () => {
  return (
    <div>
    <Carousel  >
    <Carousel.Item style={{'height':"30vw"}}>
      <img
        className="d-block w-100"
        src={img3}
        alt="First slide"
        objectFit="cover"
        style={{'width':"100%"}}
        
        />
    
    </Carousel.Item>
    <Carousel.Item style={{'height':"30vw"}}>
      <img
        className="d-block w-100"
        src={img1}
        alt="Second slide"
        objectFit="cover"
        style={{'width':"100%"}}
      />

      
    </Carousel.Item>
    <Carousel.Item style={{'height':"30vw"}}>
      <img
        className="d-block w-100"
        src={img2}
        alt="Third slide"
        objectFit="cover"
        style={{width:"100%"}}

      />

      
    </Carousel.Item>
  </Carousel>
    
    </div>
  )
}

export default CarouselHome