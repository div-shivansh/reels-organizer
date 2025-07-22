"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'


const Dashboard = () => {
    const {data: session, status} = useSession()
    const router = useRouter()

    useEffect(() => {
        const fetchlinksfromDB = async () => {
          try {
            const res = await fetch(`/api/getLinks?email=${session.user.email}`)
            const data = await res.json()

            if (data.success) {
              console.log("your data is", data)
            } else {
              console.log("some error is happedned", data.message)
            }
          } catch(err) {
            console.error("failed to load links", err)
          }
        }

        if (status === 'authenticated') {
          fetchlinksfromDB()
        }
      
        
        if (status === "unauthenticated") {
            router.push("/login")
         }
     }, [session, status, router])

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
