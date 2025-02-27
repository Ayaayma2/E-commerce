import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Allorders() {
  let [orderdata, setorderdata] = useState(null)
  let [loading, setloading] = useState(true)
  function getallorder() {
    setloading(true)
   axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/67a0c40552e8e0ca3d2f3111").then((res)=>{
        //  console.log(res.data)
        //  console.log(res.data[0].id)
         setorderdata(res.data)
         setloading(false)
   }).catch((err)=>{
    // console.log(err)
    setloading(false)
   })
  }
  useEffect(() => {
    getallorder()
  }, [])
  return (
    <div className='w-8/12 mx-auto my-4'>
      <table className='table table-hover align-middle  text-center'>
        <thead className='table-light bg-gray-200  '>
          <tr className='border-b border-blue-gray-100  p-4'>
            <th className=' text-center py-3'>#</th>
            <th className='w-4/12 text-center' >Order Price</th>
            <th className='w-4/12 text-center' >Status</th>
            <th className='w-4/12 text-center'>Action</th>
          </tr>
        </thead>


      
<br></br>

        {orderdata?.map((el,i) => {
          return (

            <tbody key={i}  className='table-group-divider '>

            <tr className='hover:bg-slate-200 '>
              <th className='ps-12'>#{el.id}</th>
              <td>{el.totalOrderPrice} EGP</td>
              <td>
                <div className='flex flex-col p-5  items-center'>
                  <span className=' bg-active text-white px-4 py-1 rounded-2xl mb-2' >is paid</span>
                  <span className=' bg-red-600 text-white px-4 py-1 rounded-2xl'>isDelivered</span>
                </div>
              </td>
              <td>
                <Link  to={'/orderdetails/' + i} className="btn cursor-pointer">View</Link>
              </td>
            </tr>
  
  
          </tbody>
         )
        })}

      </table>

    </div>



  )
}
