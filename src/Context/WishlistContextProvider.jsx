
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export let wishlistcontext = createContext()
export default function WishlistContextProvider({children}) {

    const baseurl = `https://ecommerce.routemisr.com/api/v1/wishlist`
    const headeroption = {
        headers: {
            token: localStorage.getItem("token")
        }
    }

    function getuserwishlist() {
        return axios.get(baseurl, headeroption)
    }
    function adduserwishlist(id) {
        let data={
            productId:id
        }
        return axios.post(baseurl, data, headeroption)
    }
    function deleteuserwishlist(id){
        return axios.delete(`${baseurl}/${id}`,headeroption)
    }

  return (
     <wishlistcontext.Provider value={{getuserwishlist,adduserwishlist,deleteuserwishlist}}>{children}</wishlistcontext.Provider>
        )
  
}
