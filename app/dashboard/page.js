"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'


const Dashboard = () => {
    const {data: session, status} = useSession()
    const router = useRouter()

    useEffect(() => {
      
        
        if (status === "unauthenticated") {
            router.push("/login")
         }
     }, [session, status])

       if(status === "loading" || status === "unauthenticated"){
           return(
               <div>Loading...</div>
           )
       }


  return (
    <div>
      <span>Hello {session.user.name}</span>
    </div>
  )
}

export default Dashboard
