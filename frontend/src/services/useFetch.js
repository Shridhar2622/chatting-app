import axios from "axios"
import react, { useState } from "react"

const api=axios.create({
    baseURL: "http://localhost:3000/chat/api",
    withCredentials: true //this enables cookies
})

export default function useFetch()
{
    const [data,setData]= useState(null);
    const [loading,setLoadind]= useState(false);
    const [error,setError]= useState(null);

}