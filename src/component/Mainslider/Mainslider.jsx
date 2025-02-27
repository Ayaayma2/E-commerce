import React from 'react'
import Slider from 'react-slick'
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
export default function Mainslider() {
    let settings={
        arrows:false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        autoplay:true
    }
  return (
    <div className='flex'>
        <div  className='w-9/12'>
        <Slider {...settings}>
            <div>
                <img src={img1}  alt="" className='w-full h-96 object-cover'/>
            </div>
            <div>
                <img src={img2}  alt="" className='w-full h-96 object-cover'/>
            </div>
            <div>
                <img src={img3}  alt="" className='w-full h-96 object-cover'/>
            </div>
        </Slider>

        </div>
        <div className='w-3/12'>
        <div><img src={img1} alt=""className='w-full h-48 object-cover' /></div>
        <div><img src={img2} alt="" className='w-full h-48 object-cover' /></div>
        </div>
    </div>
  )
}
