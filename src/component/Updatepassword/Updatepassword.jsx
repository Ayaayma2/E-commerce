import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function Updatepassword() {
  const baseurl = "https://ecommerce.routemisr.com"
  let [errormessage, seterror] = useState(null)
  let navg = useNavigate()
  let initialValues = {
    email: "",
    newPassword: "",
  }
  let validyup = Yup.object({
    email: Yup.string().required("Email Required").email("Enter Valid Email"),
    newPassword: Yup.string().required("new Password Required").matches(/(?=.*\d.*)(?=.*[a-zA-Z].*)(?=.*[!#\$%&@\?].*).{8,}/, "Enter Valid  new Password"),
  }
  )
  async function newPasswordapi(data) {
    axios.put(`${baseurl}/api/v1/auth/resetPassword`, data)
      .then((req) => {
        if (req.data.token) {
          navg('/login')
        }
      })
      .catch((err) => {
        seterror(err.response.data.message)
      })
  }
  let newPasswordform = useFormik({
    initialValues,
    onSubmit: newPasswordapi,
    validationSchema: validyup

  })
  return (
    <>
   
     <h2 className='w-8/12 mt-10 mb-5 mx-auto container font-bold' >Update Password</h2>
   
     
      {errormessage ? <div className="p-4 mb-4 w-1/2 m-auto text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {errormessage}
      </div> : ""}

      <form onSubmit={newPasswordform.handleSubmit} className="w-8/12 mx-auto">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input value={newPasswordform.values.email}
            onChange={newPasswordform.handleChange}
            onBlur={newPasswordform.handleBlur}
            type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {newPasswordform.touched.email && newPasswordform.errors.email ? <p className='text-red-600'>{newPasswordform.errors.email}</p> : ""}
        </div>

        
        <div className="mb-5">
          <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your new password</label>
          <input value={newPasswordform.values.newPassword}
            onChange={newPasswordform.handleChange}
            onBlur={newPasswordform.handleBlur}
            type="password" id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {newPasswordform.touched.newPassword && newPasswordform.errors.newPassword ? <p className='text-red-600'>{newPasswordform.errors.newPassword}</p> : ""}
        </div>



        <button disabled={!(newPasswordform.isValid && newPasswordform.dirty)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:active disabled:bg-active disabled:bg-opacity-40">Update Password</button>
      </form>

    </>
  )
}

