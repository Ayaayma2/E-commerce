import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function Signup() {
  const baseurl = "https://ecommerce.routemisr.com"
  let [errormessage, seterror] = useState(null)
  let navg = useNavigate()
  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  }
  let validyup = Yup.object({
    name: Yup.string().required("Name Required").min(3, "min character is 3").max(40, "max character is 40"),
    email: Yup.string().required("Email Required").email("Enter Valid Email"),
    password: Yup.string().required("Password Required").matches(/(?=.*\d.*)(?=.*[a-zA-Z].*)(?=.*[!#\$%&@\?].*).{8,}/, "Enter Valid Password"),
    rePassword: Yup.string().required("rePassword Required").oneOf([Yup.ref('password')], "RePassword Not Matched with Password"),
    phone: Yup.string().required("Phone Required").matches(/^01[0-2]\d{1,8}$/, "Enter Valid Phone")
  }
  )
  async function registerapi(data) {
    axios.post(`${baseurl}/api/v1/auth/signup`, data)
      .then((req) => {
        if (req.data.message == 'success') {
          navg('/login')
        }
      })
      .catch((err) => {
        seterror(err.response.data.message)
      })
  }
  let registerform = useFormik({
    initialValues,
    onSubmit: registerapi,
    validationSchema: validyup

  })
  return (
    <>
      <h2 className='w-8/12 mt-10 mb-5 mx-auto container font-bold' >Register Now:</h2>

      {errormessage ? <div className="p-4 mb-4 w-1/2 m-auto text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {errormessage}
      </div> : ""}

      <form onSubmit={registerform.handleSubmit} className="w-8/12 mx-auto">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input value={registerform.values.email}
            onChange={registerform.handleChange}
            onBlur={registerform.handleBlur}
            type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {registerform.touched.email && registerform.errors.email ? <p className='text-red-600'>{registerform.errors.email}</p> : ""}
        </div>

        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
          <input value={registerform.values.name}
            onChange={registerform.handleChange}
            onBlur={registerform.handleBlur}
            type="text" id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {registerform.touched.name && registerform.errors.name ? <p className='text-red-600'>{registerform.errors.name}</p> : ""}
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input value={registerform.values.password}
            onChange={registerform.handleChange}
            onBlur={registerform.handleBlur}
            type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {registerform.touched.password && registerform.errors.password ? <p className='text-red-600'>{registerform.errors.password}</p> : ""}
        </div>

        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your rePassword</label>
          <input value={registerform.values.rePassword}
            onChange={registerform.handleChange}
            onBlur={registerform.handleBlur}
            type="password" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {registerform.touched.rePassword && registerform.errors.rePassword ? <p className='text-red-600'>{registerform.errors.rePassword}</p> : ""}
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
          <input type="tel" value={registerform.values.phone}
            onChange={registerform.handleChange}
            onBlur={registerform.handleBlur}
            id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {registerform.touched.phone && registerform.errors.phone ? <p className='text-red-600'>{registerform.errors.phone}</p> : ""}
        </div>

        <button disabled={!(registerform.isValid && registerform.dirty)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:active disabled:bg-active disabled:bg-opacity-40">Submit</button>
      </form>

    </>
  )
}
