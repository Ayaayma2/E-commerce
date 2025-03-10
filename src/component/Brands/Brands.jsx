import React from 'react'
import Useapi from '../../Hooks/Useapi'

export default function Brands() {
  
  let {isLoading,data}=Useapi("brands")
 if(isLoading){
   return  <div className='bg-slate-200 flex justify-center items-center h-screen'>
   <span class="loader"></span>
 </div>
 }
   return (
     <>
 
     <div className='flex flex-wrap  '>
      {data?.data?.data?.map((el) => {
                   return( 
                      <div key={el._id} className='w-3/12  mb-10'>
                         <img src={el.image} className='w-full shadow-sm shadow-gray-100  max-h-72 object-cover object-top'></img>
                         <h5 className='text-center'>{el.name}</h5>
                     </div>
                   )
                 })}
                  </div>
     </>
   )
}
