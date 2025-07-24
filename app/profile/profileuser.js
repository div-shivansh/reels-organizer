'use client'
import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const ProfileUser = () => {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserFromDB = async () => {
      try {
        const res = await fetch(`/api/getUser?email=${session.user.email}`)
        const data = await res.json()

        if (data.success) {
          setUserData(data.user)
        } else {
          console.error(data.message || "failed to load data")
        }

      } catch (error) {
        console.error("Failed to load user", error)
        alert("Something went wrong")
        router.push("/dashboard")
      }
    }
    if (status === 'authenticated') {
      fetchUserFromDB()
    }
  }, [session, status])

  if (status === 'loading') {
    return <div className='text-black'>Loading...</div>
  }
  if (status === 'unauthenticated') {
    return <div className='text-black'>Yaha maa mat chuda bsdk...</div>
  }

  if (!userData) {
    return <div className='text-black'>Loading Profile...</div>
  }


  return (
    <div className='bg-neutral-800 min-h-[86vh] w-full text-white'>
      <section className='px-20 py-5'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col justify-center'>
        <h1 className='text-white font-bold text-5xl'>Profile</h1>
        <span className='text-neutral-500'>View all your profile details here</span>
          </div>
          <div className='flex items-center justify-center gap-5'>
            <button className='bg-neutral-700 p-2 px-5 text-2xl font-medium rounded-full hover:text-green-400 hover:scale-105 cursor-pointer transition-all duration-100 drop-shadow-2xl'>Edit Profile</button>
            <button className='bg-neutral-700 p-2 px-5 text-2xl font-medium rounded-full hover:text-green-400 hover:scale-105 cursor-pointer transition-all duration-100 drop-shadow-2xl' onClick={() => {signOut()}}>Logout</button>
          </div>
        </  div>
        <div className='border-t-2 border-dashed mt-5 mb-10 border-neutral-500' />
        <div className='flex gap-15'>
          <div className='border border-neutral-500 w-[30vw] h-[60vh] rounded-4xl flex flex-col items-center pt-5 drop-shadow-2xl bg-neutral-800'>
            <h2 className='font-bold text-3xl'>{userData.fname} {userData.lname}</h2>
            <span className='text-green-400 text-xl mb-7'>@{userData.username}</span>
            <Image src={userData.image} width={400} height={400} alt='profile' className='rounded-full border-40 border-neutral-500' />
          </div>
          <div className='border border-neutral-500 rounded-4xl w-[60vw] py-6 px-7 drop-shadow-2xl bg-neutral-800'>
            <h3 className='font-semibold text-2xl mb-5'>Bio and Other details</h3>
            <div className='flex flex-col p-5 gap-2'>

              <div className='flex items-center px-3'>
                <div className='flex flex-col w-full gap-1'>
                  <span className='text-neutral-500 text-xl font-medium'>Email</span>
                  <span className='text-xl p-1'>{userData.email}</span>
                </div>

                <div className="flex flex-col w-full gap-1">
                  <span className='text-neutral-500 text-xl font-medium'>Date of birth</span>
                  <span className='text-xl p-1'>{userData.dob}</span>
                </div>
              </div>

              <hr className='text-neutral-500' />

              <div className="flex items-center px-3">
                <div className="flex flex-col w-full gap-1">
                  <span className='text-neutral-500 text-xl font-medium'>WhatsApp</span>
                  <Link href={`https://wa.me/91${userData.number}`} target='_blank' className='text-xl hover:bg-neutral-700 hover:rounded p-1 hover:text-green-400 transition-all duration-150 ease-in'>+91{userData.number}</Link>
                </div>

                <div className="flex flex-col w-full gap-1">
                  <span className='text-neutral-500 text-xl font-medium'>Instagram</span>
                  <Link href={`https://instagram.com/${userData.handle}`} target='_blank' className='text-xl hover:bg-neutral-700 hover:rounded p-1 hover:text-green-400 transition-all duration-150 ease-in'>@{userData.handle}</Link>
                </div>
              </div>

              <hr className='text-neutral-500' />

              <div className="flex-col flex gap-2">
                <span className='text-neutral-500 text-xl font-medium'>Interests</span>
                <div className='flex gap-2'>
                  {userData.tags.map((item, index) => {
                    return <span key={index} className='text-xl'>#{item},</span>
                  })
                  }
                </div>
              </div>

              <hr className='text-neutral-500' />

              <div className='flex flex-col gap-2'>
                <span className='text-neutral-500 text-xl font-medium'>About me</span>
                <p className='text-xl'>{userData.bio}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='border border-neutral-500 rounded-4xl w-full h-[30vh] my-[60] flex flex-col py-5 px-10 gap-4 drop-shadow-2xl bg-neutral-800'>
          <h3 className='font-semibold text-2xl mb-5'>Monthly Reels Stats</h3>
          <div className='flex items-center justify-evenly'>
          <div className="relative size-40">
            <svg className="rotate-[135deg] size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2" strokeDasharray="75 100" strokeLinecap="round"></circle>
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-400" strokeWidth="2" strokeDasharray="37.5 100" strokeLinecap="round"></circle>
            </svg>
            <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-5xl font-bold text-white">50</span>
              <span className="text-white block text-xl">Saved</span>
            </div>
          </div>
          <div className="relative size-40">
            <svg className="rotate-[135deg] size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2" strokeDasharray="75 100" strokeLinecap="round"></circle>
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-400" strokeWidth="2" strokeDasharray="22.5 100" strokeLinecap="round"></circle>
            </svg>
            <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-5xl font-bold text-white">30</span>
              <span className="text-white block text-xl">Watched</span>
            </div>
          </div>
          <div className="relative size-40">
            <svg className="rotate-[135deg] size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2" strokeDasharray="75 100" strokeLinecap="round"></circle>
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-400" strokeWidth="2" strokeDasharray="7.5 100" strokeLinecap="round"></circle>
            </svg>
            <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-5xl font-bold text-white">10</span>
              <span className="text-white block text-lg">Downloaded</span>
            </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfileUser
