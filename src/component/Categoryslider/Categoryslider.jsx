import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import Useapi from '../../Hooks/Useapi'

export default function Categoryslider() {
    // let [ categorylist, setcategorylist ] = useState(null)
    // function getallcategory() {
    //     axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    //         .then((req) => {
    //             setcategorylist(req.data.data)
    //         })
    //         .catch((err) => {
    //                  console.log("errrrrrrrror")
    //         })
    // }
    // useEffect(() => { getallcategory() }, [])

    let{isLoading,data}= Useapi("categories")
    if(isLoading){
        return <h2><div className='bg-slate-200 flex justify-center items-center h-screen'>
        <span class="loader"></span>
      </div></h2>
    }
    return (
        <div className='my-5'>
            <Slider autoplay infinite slidesToShow={6} slidesToScroll={6} speed={500} >
                {data?.data?.data?.map((el) => {
                  return( 
                     <div key={el._id}>
                        <img src={el.image} className='w-full h-48 object-cover object-top'></img>
                        <h5 className='text-center'>{el.name}</h5>
                    </div>
                  )
                })}
            </Slider>
        </div>
    )
}
