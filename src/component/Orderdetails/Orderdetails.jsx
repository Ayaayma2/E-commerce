import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Orderdetails() {
  let [detailsoforder, setdetailsoforder] = useState(null)
  let { idorder } = useParams()
  console.log(idorder)
  function getalldetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/67a0c40552e8e0ca3d2f3111`).then((req) => {
      // console.log(req.data)
      let array = []
      array = req.data
      let filterarray = array.filter((el, i) => {
        return i == idorder;
      })
      console.log(filterarray)
      setdetailsoforder(filterarray)

    }).catch((err) => {
      console.log(err)
    })

  }
  useEffect(() => {
    getalldetails()
  }, [])

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: 'long', // للحصول على اسم اليوم كاملاً (Friday)
      day: 'numeric', // للحصول على رقم اليوم (15)
      month: 'long', // للحصول على اسم الشهر كاملاً (February)
      year: 'numeric', // للحصول على السنة (2025)
    };
    return date.toLocaleDateString('en-US', options);
  }
  
  return (
    <div className='w-8/12 mx-auto my-11 rounded-2xl shadow-lg p-5 bg-gray-50'>
      {detailsoforder?.map((el, i) => {
        return (
          <>
            <div key={i} className='flex justify-around align-center flex-wrap mb-4'>

              <div className='my-3'>
                <h6 className='font-bold text-active'>
                  <span className=' text-black'>Order ID:
                    <span className='font-thin text-active'>{el.id}</span>
                  </span>

                </h6>
                <h6 className='font-bold'>
                  Total Payment Price:
                  <span className='text-active font-thin'>
                    {el.totalOrderPrice}EGP
                  </span>
                </h6>
                <h6 className='font-bold d-flex'>
                  Payment Method:
                  <span className=' bg-active text-white rounded-3xl ms-2 px-2 py-1 font-thin'>{el.paymentMethodType}</span>
                </h6>
                <h6 className='text-gray-400 fw-n'>
                  
               {formatDate(el.createdAt)}  
                </h6>
              </div>

              <div className='font-bold my-3'>
                <h5>
                  Address Info
                  <i class="fa-solid fa-location-dot"></i>
                </h5>
                <p className='m-0'>
                  <span className='text-gray-400 font-thin'>Address Details:
                    <span className='font-thin text-black'>{el.shippingAddress.details}</span>
                  </span>
                </p>
                <p className='m-0'>
                  <span className='text-gray-400 font-thin'>City:
                    <span className='text-black'  >{el.shippingAddress.city}</span>
                  </span>
                </p>
                <p className='m-0'>
                  <span className='text-gray-400 font-thin'>phone:
                    <span className='font-thin text-black'>{el.shippingAddress.phone}</span>
                  </span>
                </p>
              </div>

              <div className=' my-3'>
                <h5 className='font-bold'>
                  Customer Info
                  <i class="fa-solid fa-circle-user"></i>
                </h5>
                <p className='m-0'>
                  <span className='text-gray-400'>Name:
                  </span>
                  <span > {el.user.name}</span>
                </p>
                <p className='m-0'>
                  <span className='text-gray-400'>Email:
                  </span>
                  <span> {el.user.email}</span>
                </p>
                <p className='m-0'>
                  <span className='text-gray-400'>Phone:</span>
                  <span > {el.user.phone}</span>
                </p>
              </div>
            </div>


            <table className='table table-hover align-middle  text-center'>
              <thead className='table-light bg-gray-200  '>

                <tr className='border-b border-blue-gray-100  '>
                  <th className='w-1/12 text-center ps-5  ' >Product</th>
                  <th className='w-1/12 text-center ps-5 ' >Price</th>
                  <th className='w-1/12 text-center ps-5'>Quantity</th>
                </tr>


              </thead>



              <br></br>


{el?.cartItems?.map((item,i) => {
  return(
    <tbody key={i} className='table-group-divider '>

                <tr className='hover:bg-slate-200 '>
                  <td>
                    <div className='flex items-center justify-center py-3 '>
                      <img src={item?.product?.imageCover} alt={item?.product?.title} className='w-20' />
                      <span>{item?.product?.title}</span>
                    </div>
                  </td>
                  <td className='text-center'>
                    {item.price} EGP
                  </td>
                  <td>
                   {item.count}
                  </td>

                </tr>


              </tbody>
  )
})}
              


            </table>
          </>
        )
      })}
    </div>
  )
}
