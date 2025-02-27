
import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import imglogo from '../../assets/images/freshcart-logo.svg'
import { AuthContext } from '../../Context/AuthContextProvider'
import CartContextProvider, { cartcontext } from '../../Context/CartContextProvider'
import { wishlistcontext } from '../../Context/WishlistContextProvider'
export default function Navbar() {
    let { token, settoken } = useContext(AuthContext)
    let navg = useNavigate()
    let { numscartitem } = useContext(cartcontext)
    function logout() {
        localStorage.removeItem("token")
        settoken(null)
        navg('/login')
    }
    return (
        <>
            <nav class="bg-white  border-gray-200 shadow-lg">
                <div class="max-w-screen-xl flex md:flex-nowrap items-center   mx-auto p-4">
                    <Link to="" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={imglogo} class="h-8" alt="Flowbite Logo" />

                    </Link>
                    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div class="hidden  w-full md:flex justify-between" id="navbar-default">
                        {token ? <ul className="font-medium flex  flex-col p-4 md:p-0 mt-4 border  border-gray-100 rounded-lg bg-gray-50 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0  md:bg-white ">
                            <li className='px-2'>
                                <NavLink to="/" className="block py-2" aria-current="page" >Home</NavLink>
                            </li>
                            <li className='px-2'>
                                <NavLink to="/product" className="block py-2" aria-current="page">Products</NavLink>
                            </li>
                            <li className='px-2'>
                                <NavLink to="/cart" className="block py-2 px-2" aria-current="page">Cart</NavLink>
                            </li>
                            <li className='px-2'>
                                <NavLink to="/allorders" className="block py-2 px-2" aria-current="page">All Orders</NavLink>
                            </li>
                            <li className='px-2'>
                                <NavLink to="/wishlist" className="block py-2 px-2" aria-current="page">WishList</NavLink>
                            </li>
                            <li className='px-2'>
                                <NavLink to="/categories" className="block py-2" aria-current="page">Categories</NavLink>
                            </li>
                            <li className='px-2'>
                                <NavLink to="/brands" className="block py-2" aria-current="page" >Brands</NavLink>
                            </li>

                        </ul> : ""
                        }

                        <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 ms-auto border border-gray-100 rounded-lg bg-gray-50 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0  md:bg-white ">
                            <li className='space-x-3'>
                                <a href="#">
                                    <i className="fa-brands fa-facebook hover:text-active text-xl"></i>
                                </a>
                                <a href="#">
                                    <i className="fa-brands fa-twitter  hover:text-active text-xl"></i>
                                </a>
                                <a href="#">
                                    <i className="fa-brands fa-instagram  hover:text-active text-xl"></i>
                                </a>
                                <a href="#">
                                    <i className="fa-brands fa-youtube me-2  hover:text-active text-xl"></i>
                                </a>
                            </li>
                            {token ? <>
                                <li className='relative mx-4 text-xl '>
                                    <i className="fa-solid fa-cart-shopping text-active"></i>
                                    <span className='absolute top-0 end-0 -translate-y-4 translate-x-2 text-active'>{numscartitem}</span>
                                </li>
                                <li className='ms-2 cursor-pointer'>
                                    <span onClick={logout}>Logout</span>
                                </li>
                            </> :
                                <>  <li>
                                    <NavLink to="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100  " aria-current="page">Login</NavLink>
                                </li>
                                    <li>
                                        <NavLink to="/signup" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100  " aria-current="page">Register</NavLink>
                                    </li></>
                            }


                        </ul>
                    </div>
                </div>

            </nav>
        </>
    )
}
