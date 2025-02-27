import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { cartcontext } from '../../Context/CartContextProvider'
import toast, { Toaster } from 'react-hot-toast'
import { wishlistcontext } from '../../Context/WishlistContextProvider'
Slider
export default function Productdetails() {
    let { id } = useParams()
  /*  let [product, setproduct] = useState(null)
    let [loading,setloading]=useState(true)
    function getdetails(id) {
        setloading(true)
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((req) => {
                setproduct(req.data.data)
                setloading(false)
            })
            .catch((err)=>{
                setloading(false)
            })
    }
    useEffect(() => {
        getdetails(id)
    }, [id]) */

let{addusercart,setnumscartitem}= useContext(cartcontext)
let{adduserwishlist}= useContext(wishlistcontext)
   let {isLoading,data} = useQuery({
        queryKey:['datadetails',id],
        queryFn:function(){
            return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        }
        
    })
    let product=data?.data?.data;

    function addcart(id){
        addusercart(id).then((req)=>{
    setnumscartitem(req.data.numOfCartItems)
    toast.success(req.data.message)
        }).catch((err)=>{
    toast.error(err.response.data.message)
        })
      }

      function addwishlist(id){
        adduserwishlist(id).then((req)=>{
          if(req.data=='success'){
            toast.success(req.data.message)
          }
    
        }).catch((err)=>{
          toast.error(err.message)
        })
      }
    
    return (
        <>
        <Toaster/>
        {isLoading ?
        <div className='bg-slate-200 flex justify-center items-center h-screen'>
          <span class="loader"></span>
        </div> :
        <div className='w-10/12 mx-auto my-5'>
        <div className='flex justify-between items-center'>
            <div className='w-3/12'>
                {/* <img src={product?.imageCover} className='w-full' alt="" /> */}
                <Slider dots>
                    {product?.images.map((image,i)=>{
                        return(
                            <div key={i}>
                            <img src={image} className='w-full' alt="" />
                        </div>
                        )
                      
                    })}
                </Slider>

            </div>
            <div className='w-8/12'>
                <h2>{product?.title}</h2>
                <div className='flex justify-between items-center'>
                <p className='text-gray-500 my-5'>{product?.description}</p>
                <i onClick={()=>{addwishlist(id)}} class="fa-regular fa-heart text-2xl cursor-pointer"></i>
                </div>
              
                <div className='flex justify-between'>
                    <span>{product?.price}EGP</span>
                    <span><i class="fa-solid fa-star text-yellow-500"></i>{product?.ratingsQuantity}</span>
                </div>
                <button onClick={()=>{addcart(id)}} className='btn mt-3'> Add to Card</button>

            </div>
        </div>
    </div>}
        </>
        
    )
}
