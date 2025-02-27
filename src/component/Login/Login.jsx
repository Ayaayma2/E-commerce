import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { AuthContext } from '../../Context/AuthContextProvider'
export default function Login() {
  const baseurl = "https://ecommerce.routemisr.com"
  let [errormessage, seterror] = useState(null)
  let navg = useNavigate()
  let {settoken}=useContext(AuthContext)
  let initialValues = {
    email: "",
    password: "",
  }
  let validyup = Yup.object({
    email: Yup.string().required("Email Required").email("Enter Valid Email"),
    password: Yup.string().required("Password Required").matches(/(?=.*\d.*)(?=.*[a-zA-Z].*)(?=.*[!#\$%&@\?].*).{8,}/, "Enter Valid Password"),
  }
  )
  async function loginapi(data) {
    axios.post(`${baseurl}/api/v1/auth/signin`, data)
      .then((req) => {
        if (req.data.message == 'success') {
          localStorage.setItem("token", req.data.token)
          settoken(req.data.token)
          navg('/')
        }
      })
      .catch((err) => {
        seterror(err.response.data.message)
      })
  }
  let loginform = useFormik({
    initialValues,
    onSubmit: loginapi,
    validationSchema: validyup

  })
  return (
    <>
      <h2 className='w-8/12 mt-10 mb-5 mx-auto container font-bold' >login Now:</h2>
      {errormessage ? <div className="p-4 mb-4 w-1/2 m-auto text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {errormessage}
      </div> : ""}

      <form onSubmit={loginform.handleSubmit} className="w-8/12 mx-auto">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input value={loginform.values.email}
            onChange={loginform.handleChange}
            onBlur={loginform.handleBlur}
            type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {loginform.touched.email && loginform.errors.email ? <p className='text-red-600'>{loginform.errors.email}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input value={loginform.values.password}
            onChange={loginform.handleChange}
            onBlur={loginform.handleBlur}
            type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {loginform.touched.password && loginform.errors.password ? <p className='text-red-600'>{loginform.errors.password}</p> : ""}
        </div>

        <Link to='/forgetpassword' className='text-active pb-6'>ForgetPassword?</Link>
        <br></br>
        <button disabled={!(loginform.isValid && loginform.dirty)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:active disabled:bg-active disabled:bg-opacity-40">Login</button>
      </form>

    </>
  )
}
