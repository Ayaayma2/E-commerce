import React, { useContext, useEffect, useState } from 'react'
import { cartcontext } from '../../Context/CartContextProvider'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Cart() {
  let { getusercart, deleteusercart, setnumscartitem, clearusercart, updatecartitemcount } = useContext(cartcontext)
  let [cartdata, setcartdata] = useState(null)
  let [loading, setloading] = useState(true)
  let [loadingcount, setloadingcount] = useState(false)
  useEffect(() => {
    setloading(true)
    getusercart().then((req => {
      console.log(req)
      setcartdata(req.data.data)
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

  function removeitem(id) {
    deleteusercart(id).then((req) => {
      setnumscartitem(req.data.numOfCartItems)
      setcartdata(req.data.data)
      toast.success("product deleted")
    }).catch((err) => {
      toast.error("product not deleted")
    })
  }

  function clearitems() {
    clearusercart().then((req) => {
      if (req.data.message == 'success') {
        setcartdata(null)
        setnumscartitem(null)
        toast.success("All Item in Cart deleted")
      }
    })
  }

  function updatecount(id, count) {
    document.getElementById(id).innerHTML =
      ' <i class="fa-solid fa-spinner fa-spin text-active"></i>'
    updatecartitemcount(id, count).then((req) => {
      setcartdata(req.data.data)
      setnumscartitem(req.data.numOfCartItems)
      document.getElementById(id).innerHTML = count
    })
  }
  return (
    <>
      <Toaster />
      {
        cartdata?.products.length > 0 ? (
          <div className='w-10/12 mx-auto my-5'>
            <div className='bg-gray-200'>
              <h1 className='text-2xl ms-2'>Shop Cart</h1>
              <div className='flex justify-between'>
                <h2 className='text-2xl text-active ms-2'> Total Cart Price {cartdata.totalCartPrice} EGP</h2>
                <button onClick={clearitems} className='bg-red-600 text-white py-2 px-3 rounded'>Clear All Cart</button>
              </div>


              <div className='divide-y-2 divide-gray-300 '>
                {cartdata.products.map((el) => {
                  return <div key={el._id} className='flex items-center '>
                    <div className='w-10/12'>
                      <div className='flex justify-around'>
                        <div className='w-1/12 my-3'>
                          <img src={el.product.imageCover} alt="" /></div>
                        <div className='w-10/12 my-3'>
                          <h2>{el.product.title}</h2>
                          <h2 className='text-active'>Price: {el.price} EGP</h2>
                          <button onClick={() => { removeitem(el.product._id) }} className='border border-red-500 px-5 py-2 rounded text-red-500 hover:bg-red-500 hover:text-white'> <i className='fa-solid fa-trash-can mr-2'></i>Remove</button>
                        </div>
                      </div>
                    </div>
                    <div className='2/12 my-3'>
                      <i onClick={() => { updatecount(el.product._id, el.count + 1) }} className='fa-solid fa-plus rounded  border border-active p-2 '></i>
                      {loadingcount ?
                        <i className="fa-solid fa-spinner fa-spin text-active"></i>
                        : <span id={el.product._id} className='mx-2'>{el.count}</span>}

                      <i onClick={() => { updatecount(el.product._id, el.count - 1) }} className='fa-solid fa-minus rounded  border border-active p-2 '></i>
                    </div>
                  </div>
                })}

              </div>
<Link to={'/shippingdetails/'+cartdata._id} className='btn block text-center'> Pay <i className='fa-brands fa-cc-visa'></i></Link>


            </div>
          </div>
        ) :
          <div className='bg-gray-300 text-white flex-nowrap  py-7'>
            <p className='text-center text-lg '> Not found data , Go To Home and add items to this Cart </p>
            <Link to="/" className="block py-2 text-2xl  text-center hover:text-green-700 text-active " aria-current="page" >Go TO Home Page
              <i class="fa-solid fa-arrow-right ms-4"></i></Link>

          </div>
      }

    </>



  )
}



