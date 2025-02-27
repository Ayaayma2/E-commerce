import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
export default function Shippingdetails() {
    let { cartid } = useParams()
    const headeroption = {
        headers: {
            token: localStorage.getItem("token")
        }
    }
    let shippingformik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        onSubmit: checkoutsession,
        validationSchema: Yup.object({
            details: Yup.string().required("Details Required").min(3, "min character is 10").max(40, "max character is 100"),
            phone: Yup.string().required("Password Required").matches(/^01[0-2]\d{1,8}$/, "Enter Valid Phone"),
            city: Yup.string().required("City Required").min(3, "min character is 3").max(40, "max character is 30")
        }
        )
    })

    function checkoutsession(values) {
        console.log(values)
        let data = {
            shippingAddress: values
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:5176`, data, headeroption)
         .then((req) => {
            window.open(req.data.session.url, "_self")
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className='w-7/12 mx-auto '>
            <h1 className='text-active text-3xl my-10'>Shipping Details</h1>
            <form onSubmit={shippingformik.handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
                    <input value={shippingformik.values.details}
                        onChange={shippingformik.handleChange}
                        onBlur={shippingformik.handleBlur}
                        type="text" id="details" name='details' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    {shippingformik.touched.details && shippingformik.errors.details ? <p className='text-red-600'>{shippingformik.errors.details}</p> : ""}
                </div>
                <div className="mb-5">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
                    <input value={shippingformik.values.city}
                        onChange={shippingformik.handleChange}
                        onBlur={shippingformik.handleBlur}
                        type="text" id="city" name='city' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    {shippingformik.touched.city && shippingformik.errors.city ? <p className='text-red-600'>{shippingformik.errors.city}</p> : ""}
                </div>

                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                    <input value={shippingformik.values.phone}
                        onChange={shippingformik.handleChange}
                        onBlur={shippingformik.handleBlur}
                        type="tel" id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    {shippingformik.touched.phone && shippingformik.errors.phone ? <p className='text-red-600'>{shippingformik.errors.phone}</p> : ""}
                </div>
                <button disabled={!(shippingformik.isValid && shippingformik.dirty)} type='submit' className='btn disabled:bg-active disabled:bg-opacity-40'>Check Out</button>
            </form>
        </div>
    )
}
