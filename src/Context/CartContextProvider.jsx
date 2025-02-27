import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export let cartcontext = createContext()
export default function CartContextProvider({ children }) {
    const baseurl = `https://ecommerce.routemisr.com/api/v1/cart`
    const headeroption = {
        headers: {
            token: localStorage.getItem("token")
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("token")){
            getusercart().then((req)=>{
                setnumscartitem(req.data.numOfCartItems)
            })
        }
    })
    let [numscartitem,setnumscartitem]=useState(null)
    function getusercart() {
        return axios.get(baseurl, headeroption)
    }

    function addusercart(id) {
        let data={
            productId:id,
        }
        return axios.post(baseurl,data, headeroption)
    }
function deleteusercart(id){
    return axios.delete(`${baseurl}/${id}`,headeroption)
}
function clearusercart(){
    return axios.delete(baseurl,headeroption)
}

function updatecartitemcount(id,count){
    let data={
        count:count,
    }
    return axios.put(`${baseurl}/${id}`,data,headeroption)
}
    return (
       <cartcontext.Provider value={{getusercart,numscartitem,setnumscartitem,addusercart,deleteusercart,clearusercart,updatecartitemcount}}>{children}</cartcontext.Provider>
    )
}
