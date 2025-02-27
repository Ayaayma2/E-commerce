import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ForgetPassword() {
    const baseurl = "https://ecommerce.routemisr.com"
    let [errormessage, seterror] = useState(null)
    let [display, setdisplay] = useState(true)
    let navg = useNavigate()
    let initialValues = {
        email: "",
    }
    let validyup = Yup.object({
        email: Yup.string().required("Email Required").email("Enter Valid Email"),
    }
    )
    async function forgetpasswordapi(data) {
        axios.post(`${baseurl}/api/v1/auth/forgotPasswords`, data)
            .then((req) => {
                console.log(req)
                if (req.data.statusMsg == 'success') {
                    setdisplay(false)
                }
            })
            .catch((err) => {
                seterror(err.response.data.message)
            })
    }
    let forgetpasswordform = useFormik({
        initialValues,
        onSubmit: forgetpasswordapi,
        validationSchema: validyup

    })

    let initialValues2 = {
        resetCode: "",
    }
    let validyup2 = Yup.object({
        resetCode: Yup.string().required("ResetCode Required")
    }
    )
    async function resetcodeapi(data) {
        axios.post(`${baseurl}/api/v1/auth/verifyResetCode`, data)
            .then((req) => {
                if (req.data.status == 'Success') {
                    navg('/updatepassword')
                }
            })
            .catch((err) => {
                seterror(err.response.data.message)
            })
    }
    let resetcodeform = useFormik({
        initialValues: initialValues2,
        onSubmit: resetcodeapi,
        validationSchema: validyup2

    })
    return (
        <>
            {
                display ? <div>


                    <h2 className='w-8/12 mt-10 mb-5 mx-auto container font-bold' > Forgetpassword Form </h2>


                    {errormessage ? <div className="p-4 mb-4 w-1/2 m-auto text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {errormessage}
                    </div> : ""}

                    <form onSubmit={forgetpasswordform.handleSubmit} className="w-8/12 mx-auto">
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input value={forgetpasswordform.values.email}
                                onChange={forgetpasswordform.handleChange}
                                onBlur={forgetpasswordform.handleBlur}
                                type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {forgetpasswordform.touched.email && forgetpasswordform.errors.email ? <p className='text-red-600'>{forgetpasswordform.errors.email}</p> : ""}
                        </div>


                        <button disabled={!(forgetpasswordform.isValid && forgetpasswordform.dirty)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:active disabled:bg-active disabled:bg-opacity-40">Send</button>
                    </form>

                </div>
                    : <div>


                        <h2 className='w-8/12 mt-10 mb-5 mx-auto container font-bold' > VerifyResetCode Form </h2>


                        {errormessage ? <div className="p-4 mb-4 w-1/2 m-auto text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {errormessage}
                        </div> : ""}

                        <form onSubmit={resetcodeform.handleSubmit} className="w-8/12 mx-auto">
                            <div className="mb-5">
                                <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your resetCode</label>
                                <input value={resetcodeform.values.resetCode}
                                    onChange={resetcodeform.handleChange}
                                    onBlur={resetcodeform.handleBlur}
                                    type="string" id="resetCode" name='resetCode' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                {resetcodeform.touched.resetCode && resetcodeform.errors.resetCode ? <p className='text-red-600'>{resetcodeform.errors.resetCode}</p> : ""}
                            </div>


                            <button disabled={!(resetcodeform.isValid && resetcodeform.dirty)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:active disabled:bg-active disabled:bg-opacity-40">VerifyCode</button>
                        </form>
                    </div>
            }


        </>
    )
}

