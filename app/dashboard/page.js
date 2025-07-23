"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'


const Dashboard = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [linksData, setLinksData] = useState(null)

  useEffect(() => {
    const fetchlinksfromDB = async () => {
      try {
        const res = await fetch(`/api/getLinks?email=${session.user.email}`)
        const ldata = await res.json()

        if (ldata.success) {
          setLinksData(ldata.links)
        } else {
          console.log("some error is happedned", ldata.message)
        }
      } catch (err) {
        console.error("failed to load links", err)
      }
    }
    const fetchUserFromDB = async () => {
      try {
        const res = await fetch(`/api/getUser?email=${session.user.email}`)
        const udata = await res.json()

        if (udata.success) {
          setUserData(udata.user)
        } else {
          console.error(udata.message || "failed to load data")
        }

      } catch (error) {
        console.error("Failed to load user", error)
        alert("Something went wrong")
      }
    }

    if (status === 'authenticated') {
      fetchUserFromDB()
      fetchlinksfromDB()
    }


    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [session, status, router])

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div>Loading...</div>
    )
  }


  return (
    <div className='bg-neutral-800 min-h-[86vh] flex text-white p-2'>
      <div className='left border-r-2 border-neutral-500 pr-4 w-[20vw] sticky'>
        <div className='flex items-center justify-center gap-3 bg-neutral-700 p-2 rounded-xl drop-shadow-xl'>
          <Image src={userData?.image || session?.user?.image || "/dummy-avatar.png"} width={60} height={60} alt='profile' className='rounded-full hover:opacity-80 transition-all ease-in duration-100 cursor-pointer' />
          <div className='flex flex-col items-start justify-center'>
            <h3 className='text-lg font-medium'>{userData?.fname} {userData?.lname}</h3>
            <h4 className='text-sm text-green-400'>@{userData?.username}</h4>
          </div>
          <Link href={"/profile"}>
          <Image src={"/share.svg"} width={30} height={30} alt='redirect' className='hover:opacity-80 cursor-pointer'/>
          </Link>
        </div>
        <div className='mt-3'>
          <h2 className='text-2xl font-bold'>Categories</h2>
          <ul className='flex flex-col gap-2 mt-4'>
            {userData?.tags?.map((tag, index) => {
              return (
                <li key={index} className='text-xl font-semibold text-center bg-neutral-700 p-2 rounded-xl drop-shadow-xl hover:text-green-400 hover:scale-105 transition-all duration-100'>{tag.toUpperCase()}</li>  
              )
            })}
          </ul>
        </div>
      </div>
      <div className='right p-4 w-full'>
        <div className="top border-b-2 border-neutral-500 px-4 h-16 flex items-center justify-between">
        <h1 className='text-3xl font-bold'>
          {{male : "Hello Bro!", female : "Hello Sweetie!", other : "Hello there!"}[userData?.gender] || "Hello User!"}
        </h1>
        <input type="text" placeholder='Search...' className='bg-neutral-700 focus:outline-2 focus:outline-green-400 placeholder:text-white p-1 px-3 rounded-lg' />
        </div>
        <div className="content">
            <h2 className='text-2xl font-bold'>Your Links</h2>
            <div className='grid grid-cols-4 gap-4 mt-4 h-[70vh] overflow-auto'>
              {linksData && linksData.length > 0 ? (
                linksData.map((link, index) => {
                  return (
                    <div key={index}>
                      <video src={link.videoUrl ? link.videoUrl : "/dummy-video.mp4"}
                      onError={(e) => e.target.src = "/dummy-video.mp4"}
                      height={600} width={360}
                      loop muted 
                      className='rounded-lg '
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => {e.target.pause(); e.target.currentTime = 0;}}
                      />
                    </div>
                  )
                })
              ) : (
                <div className='text-center'>No Reels available</div>
              )}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
