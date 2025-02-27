// import { QueryClient, useQuery } from '@tanstack/react-query'
// import axios from 'axios';
// import React from 'react'

// export default function Home() {

//   function getnews() {
//     return axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1d2c37a4a4874379acb400eb87870c4d`)
//   }

//   let { isLoading, isError, error, data } = useQuery({
//     queryKey: ["newsapi"],
//     queryFn: getnews,
//   });
//   let newslist = data?.data?.articles;
//   if (isLoading) {
//     return (
//       <div className='w-full flex justify-center items-center bg-slate-300'>
//         <span className='loader'></span>
//       </div>
//     );
//   }
//   if (isError) {
//     return <h2>{error.response.data.message}</h2>
//   }
//   return (
//     <div>
//       <div className='w-full'>
//         {
//           newslist?.map((el, i) => {
//             let { urlToImage, title, description, author } = el
//             return (
//               <div key={i} className="w-4/12">
//                 <div className='item border '>
//                   <img src={urlToImage} className="w-100" alt={title} />
//                   <h5>{title}</h5>
//                   <p>{description}</p>
//                   <h5>{author}</h5>
//                 </div>
//               </div>

//             )
//           })
//         }
//       </div>
//     </div>
//   )
// }


import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Mainslider from '../Mainslider/Mainslider'
import Categoryslider from '../Categoryslider/Categoryslider'
import { Link } from 'react-router-dom'
import { cartcontext } from '../../Context/CartContextProvider'
import toast, { Toaster } from 'react-hot-toast'
import { wishlistcontext } from '../../Context/WishlistContextProvider'
export default function Home() {
  let [productlist, setproductlist] = useState(null)
  let [loading, setloading] = useState(true)
  let [numberpages, setnumberpages] = useState(null)
  let { addusercart, setnumscartitem } = useContext(cartcontext)
 let{adduserwishlist}= useContext(wishlistcontext)
  function getallproducts(page = 1) {
    setloading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${page}`)
      .then((req) => {
        // console.log(req.data.data)
        setproductlist(req.data.data)
        let nums = []
        for (let i = 1; i <= req.data.metadata.numberOfPages; i++) {
          nums.push(i)
        }
        setnumberpages(nums)
        setloading(false)
      })
      .catch((err) => {
        console.log("errrrrrrrrrrrrrrror")
        setloading(false)
      })
  }
  useEffect(() => {
    getallproducts()
  }, [])

  function getpagenumber(e) {
    let page = e.target.getAttribute("page")
    getallproducts(page)
  }

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
    document.getElementById(id).classList.toggle("text-red-600")
        toast.success(req.data.message)
    

    }).catch((err)=>{
      toast.error(err.message)
    })
  }

  return (

    <>
    <Toaster/>
      {loading ?
        <div className='bg-slate-200 flex justify-center items-center h-screen'>
          <span class="loader"></span>
        </div> :
        <div className='w-10/12 mx-auto my-6'>
          <Mainslider></Mainslider>
          <Categoryslider></Categoryslider>
          <div className='flex flex-wrap w-full'>

            {productlist?.map((el) => {
              let { _id, title, imageCover, price, ratingsQuantity, category } = el
              return (
                <div key={_id} className='lg:w-3/12 md:w-6/12 sm:w-12/12 px-3 mb-3 w-full mt-3'>
                    <div className='item group hover:border hover:shadow-md hover:shadow-slate-200 overflow-hidden p-4'>
                    <Link to={'/productdetails/' + _id}>

                      <img src={imageCover} alt={title} className='w-full' />
                      <h5 className='text-active mt-1'>{category.name}</h5>
                      </Link>
                      <div className='flex justify-between items-center my-2'>
                      <h2>{title.split(" ").slice(0, 2).join(" ")}</h2>
                      <i onClick={()=>{addwishlist(_id)}} id={_id} className="fa-regular fa-heart text-2xl cursor-pointer"></i>
                      </div>
                     
                      <div className='flex justify-between'>
                        <span>{price}   EGP</span>
                        <span><i class="fa-solid fa-star text-yellow-500"></i>{ratingsQuantity}   </span>
                                           
                      </div>
                    
                  <button  onClick={()=>{addcart(_id)}} className='btn mt-3 translate-y-28 group-hover:translate-y-0 duration-500'> Add to Card</button>

                    </div>
                
                
                </div>
              )
            })}





          </div>




          <nav aria-label="Page navigation example">
            <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Previous</span>
                  <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
                  </svg>
                </a>
              </li>
              {numberpages?.map((el) => {
                return (<li key={el} onClick={getpagenumber}>
                  <a page={el} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{el}</a>
                </li>)
              })}

              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Next</span>
                  <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>



        </div>
      }

    </>
  )
}
