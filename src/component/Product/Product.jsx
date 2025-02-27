import React from 'react'
import Useapi from '../../Hooks/Useapi'

export default function Product() {
   let {isLoading,data}=Useapi("products")
   if(isLoading){
     return  <div className='bg-slate-200 flex justify-center items-center h-screen'>
     <span class="loader"></span>
   </div>
   }
     return (
       <>
   
       <div className='flex flex-wrap  '>
        {data?.data?.data?.map((el) => {
          let { _id, title, imageCover, price, ratingsQuantity, category } = el
                     return( 
                      <div key={_id} className='lg:w-2/12 md:w-3/12 sm:w-6/12 py-5 px-5   mb-3 w-full'>
                      <div className='item group shadow-md shadow-slate-200 overflow-hidden p-4'>
                     
  
                        <img src={imageCover} alt={title} className='w-full' />
                        <h5 className='text-active'>{category.name}</h5>
                        <h2>{title.split(" ").slice(0, 2).join(" ")}</h2>
                        <div className='flex justify-between'>
                          <span>{price}   EGP</span>
                          <span><i class="fa-solid fa-star text-yellow-500"></i>{ratingsQuantity}   </span>
                                             
                        </div>
                      
                      </div>
                  
                  
                  </div> 
                     )
                   })}
                    </div>
       </>
     )
}
