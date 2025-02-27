import React, { useContext, useEffect, useState } from 'react'
import { wishlistcontext } from '../../Context/WishlistContextProvider'
import toast, { Toaster } from 'react-hot-toast'
import { cartcontext } from '../../Context/CartContextProvider'

export default function Wishlist() {
    let { getuserwishlist,deleteuserwishlist } = useContext(wishlistcontext)
    let { addusercart, setnumscartitem } = useContext(cartcontext)
    let [wishlistdata, setwishlistdata] = useState(null)
    let [loading, setloading] = useState(true)
    useEffect(() => {
        setloading(true)
        getuserwishlist().then((req => {
            setwishlistdata(req.data)
            setloading(false)
        })).catch((err) => {
            setloading(false)
        })
    }, [])
    if (loading) {
        return <div className='bg-slate-200 flex justify-center items-center h-screen'>
            <span class="loader"></span>
        </div>
    }

    function addcart(id){
        addusercart(id).then((req)=>{
    setnumscartitem(req.data.numOfCartItems)
        toast.success(req.data.message)
        }).catch((err)=>{
         toast.error(err.response.data.message)
        })
      }
      
      function removewishlist(id){
        deleteuserwishlist(id).then((req)=>{
            getuserwishlist().then((req => {
                setwishlistdata(req.data)}))
            toast.success("item deleted of wishlist")
        }).catch((err)=>{
            toast.error("item not deleted of wishlist")
        })
      }

      
    return (<> 
        <Toaster/>
        <div className='w-10/12 mx-auto mt-10'>
            <div className='bg-gray-200'>
                <h1 className='text-3xl ms-2 py-4'>My WishList</h1>

                <div className='divide-y-2 divide-gray-300 '>
                    {wishlistdata?.data?.map((el) => {
                      return   <div key={el._id} className='flex items-center '>
                            <div className='w-10/12'>
                                <div className='flex justify-around'>
                                    <div className='w-1/12 my-3'>
                                        <img src={el.imageCover} alt={el.title} /></div>
                                    <div className='w-10/12 my-3'>
                                        <h2>{el.title}</h2>
                                        <h2 className='text-active'>Price: {el.price} EGP</h2>
                                        <button onClick={()=>{removewishlist(el._id)}} className='border border-red-500 px-5 py-2 rounded text-red-500 hover:bg-red-500 hover:text-white'> <i className='fa-solid fa-trash-can mr-2'></i>Remove</button>
                                    </div>
                                </div>
                            </div>
                            <div className='2/12 my-3'>
                            <button onClick={()=>{addcart(el._id)}}   className='btn'> Add to Card</button>
                            </div>
                        </div>
                     })} 

                </div>

            </div>
        </div>
        </>
    )
}
