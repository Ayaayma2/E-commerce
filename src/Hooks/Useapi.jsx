import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function Useapi(endpoint) {
    let req=useQuery({
        queryKey:[endpoint],
        queryFn:function() {
            return axios.get(`https://ecommerce.routemisr.com/api/v1/${endpoint}`)
        }
    })
  return (req
  )
}
