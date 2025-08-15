'use client'
import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const ProfileUser = () => {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState(null)
  const router = useRouter()
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchUserFromDB = async () => {
      try {
        const res = await fetch(`/api/getUser?email=${session.user.email}`)
        const data = await res.json()

        if (data.success) {
          setUserData(data.user)
        } else {
            toast.error('failed to load data', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }

      } catch (error) {
          toast.error('Something went wrong. Please reload or try later', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        router.push("/dashboard")
      }
    }
    if (status === 'authenticated') {
      fetchUserFromDB()
    }
  }, [session, status])

  useEffect(() => {
    const numberofData = () => {
      const ndata = (userData?.fname ? 1 : 0) + (userData?.username ? 1 : 0) + (userData?.email ? 1 : 0) + (userData?.gender ? 1 : 0) + (userData?.dob ? 1 : 0) + (userData?.handle ? 1 : 0) + (userData?.number ? 1 : 0) + (userData?.tags?.length ? 1 : 0) + (userData?.bio ? 1 : 0) + (userData?.image ? 1 : 0)
      setCount(ndata > 0 ? ndata : 0)
    }
    if (userData) {
      numberofData()
    }

  }, [userData])



  if (status === 'loading') {
    return <div className='flex items-center justify-center w-full h-screen bg-neutral-800'>
      <div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
    </div>
  }
  if (status === 'unauthenticated') {
    router.push("/login")
  }

  if (!userData) {
    return <div className='flex items-center justify-center w-full h-screen bg-neutral-800'>
      <div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
    </div>
  }

  const upperCaseFirstLetter = (str) => {
    if (str.length === 0) {
      return str
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
  }



  return (
    <div className='bg-neutral-800 min-h-[86vh] w-full text-white'>
      <section className='md:container mx-auto py-5'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col justify-center px-2'>
            <h1 className='text-white font-bold md:text-5xl xs:text-4xl text-2xl'>Profile</h1>
            <span className='text-neutral-500 md:text-base xs:text-sm text-xs'>Manage your profile information</span>
          </div>
          <div className='flex items-center max-xs:flex-col justify-center md:gap-5 gap-2 px-2'>
            <motion.button onClick={() => {router.push("/profile/edit")}}
              variants={{
                tap: { backgroundColor: "#FFFFFF", transition: { duration: 0.1, ease: "easeOut" }},
                hover: { backgroundColor: "#FFFFFF", transition: { duration: 0.2}}
              }}
              whileHover="hover"
              whileTap="tap"
              className="button relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full md:px-10 p-5 py-1.5 w-full text-center border-2 border-white text-white"
            >
              <motion.span
                initial={{ y: 0 }}
                variants={{
                  hover: { y: -40, transition: { duration: 0.2, ease: "easeInOut" } },
                  tap: { y: -40, transition: { duration: 0.1 } }
                }}
                transition={{ duration: 0.1 }}
                className="button-type md:font-semibold font-medium">Edit Profile</motion.span>
              <motion.div
                  initial={{ y: 40 }}
                variants={{
                  hover: { y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
                  tap: { y: 0, transition: { duration: 0.1 } }
                }}
                className="absolute inset-0 flex items-center justify-center">
                <span className="button-type md:font-semibold font-medium text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">Edit Profile</span>
              </motion.div>
            </motion.button>
            <motion.div onClick={() => {signOut()}}
              variants={{
                tap: { backgroundColor: "#FFFFFF", transition: { duration: 0.1, ease: "easeOut" }},
                hover: { backgroundColor: "#FFFFFF", transition: { duration: 0.2}}
              }}
              whileHover="hover"
              whileTap="tap"
              className="button relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full md:px-10 p-5 py-1.5 w-full text-center border-2 border-white text-white"
            >
              <motion.span
                initial={{ y: 0 }}
                variants={{
                  hover: { y: -40, transition: { duration: 0.2, ease: "easeInOut" } },
                  tap: { y: -40, transition: { duration: 0.1 } }
                }}
                transition={{ duration: 0.1 }}
                className="button-type md:font-semibold font-medium">Logout</motion.span>
              <motion.div
                  initial={{ y: 40 }}
                variants={{
                  hover: { y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
                  tap: { y: 0, transition: { duration: 0.1 } }
                }}
                className="absolute inset-0 flex items-center justify-center">
                <span className="button-type md:font-semibold font-medium text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">Logout</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div className='border-t-2 border-dashed mt-5 mb-10 border-neutral-500' />
        <div className='flex items-center justify-center flex-col px-2 gap-15 overflow-hidden'>
          <div className='flex gap-15 w-full max-lg:flex-col h-inherit'>
            <div className='border border-neutral-500 lg:w-2/6 w-full h-inherit rounded-4xl flex flex-col items-center pt-5 drop-shadow-2xl bg-neutral-800 truncate'>
              <h2 className='lg:font-bold font-semibold lg:text-3xl text-2xl truncate'>{userData?.fname} {userData?.lname}</h2>
              <span className='text-green-400 lg:text-xl text-lg lg:mb-7 truncate'>@{userData?.username}</span>
              <div className='relative py-2'>
                <svg className="rotate-[-90deg] lg:size-75 size-51" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="0.5" strokeLinecap="round"></circle>
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-400" strokeWidth="0.5" strokeDasharray={`${count * 10.05} 100`} strokeLinecap="round"></circle>
                </svg>
                <Image src={userData?.image || "dummy-avatar.png"} width={400} height={400} alt='profile' className='absolute lg:size-75 size-51 rounded-full top-2 lg:p-6 p-4' />
              </div>
            </div>
            <div className='border border-neutral-500 rounded-4xl lg:w-4/6 w-full py-6 xs:px-7 px-2 drop-shadow-2xl bg-neutral-800'>
              <h3 className='font-semibold text-2xl mb-5'>Bio and Other details</h3>
              <div className='flex flex-col xs:p-5 gap-2'>

                <div className='flex max-sm:flex-col gap-2 items-center sm:px-3 w-full'>
                  <div className='flex flex-col w-full gap-1 truncate'>
                    <span className='text-neutral-500 xs:text-xl text-lg font-medium'>Email</span>
                    <span className='xs:text-xl text-lg p-1 truncate'>{userData?.email || "user@gmail.com"}</span>
                    <hr className='text-neutral-500 max-sm:block hidden' />
                  </div>


                  <div className="flex flex-col w-full gap-1 truncate">
                    <span className='text-neutral-500 xs:text-xl text-lg font-medium'>Date of birth</span>
                    <span className='xs:text-xl text-lg p-1 truncate'>{userData?.dob || "YYYY-MM-DD"}</span>
                  </div>
                </div>

                <hr className='text-neutral-500' />

                <div className="flex max-sm:flex-col items-center sm:px-3 w-full">
                  <div className="flex flex-col w-full gap-1 truncate">
                    <span className='text-neutral-500 text-xl font-medium'>WhatsApp</span>
                    <Link href={`https://wa.me/91${userData?.number}`} target='_blank' className='xs:text-xl text-lg truncate hover:bg-neutral-700 hover:rounded p-1 hover:text-green-400 transition-all duration-150 ease-in'>+91{userData?.number || "XXXXXXXXXX"}</Link>
                    <hr className='text-neutral-500 max-sm:block hidden' />
                  </div>

                  <div className="flex flex-col w-full gap-1 truncate">
                    <span className='text-neutral-500 xs:text-xl text-lg font-medium'>Instagram</span>
                    <Link href={`https://instagram.com/${userData?.handle}`} target='_blank' className='xs:text-xl truncate text-lg hover:bg-neutral-700 hover:rounded p-1 hover:text-green-400 transition-all duration-150 ease-in'>@{userData?.handle || "insta_handle"}</Link>
                  </div>
                </div>

                <hr className='text-neutral-500' />

                <div className="flex-col flex gap-2">
                  <span className='text-neutral-500 xs:text-xl text-lg font-medium'>Interests</span>
                  <div className='flex gap-2 items-center flex-wrap'>
                    {userData?.tags.map((item, index) => {
                      return <span key={index} className='xs:text-xl text-lg bg-neutral-950 xs:px-4 px-2 xs:py-2 py-1 rounded-full hover:bg-gradient-to-r hover:from-yellow-400 hover:via-pink-500 hover:to-purple-700 transition-colors duration-150 ease-in cursor-pointer'>{upperCaseFirstLetter(item)}</span>
                    })
                    }
                  </div>
                </div>

                <hr className='text-neutral-500' />

                <div className='flex flex-col gap-2'>
                  <span className='text-neutral-500 xs:text-xl text-lg font-medium'>About me</span>
                  <p className='xs:text-xl text-base'>{userData?.bio}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='border border-neutral-500 rounded-4xl w-full h-full flex flex-col py-5 sm:px-10 px-2 gap-4 drop-shadow-2xl bg-neutral-800 relative'>
            <span className='text-xs absolute top-0 left-10 text-neutral-500'><span className='text-red-500'>&#42;</span>Dummy Data</span>
            <h3 className='font-semibold text-2xl mb-5 max-sm:text-center'>Monthly Reels Stats</h3>
            <div className='flex items-center justify-evenly'>
              <div className="relative sm:size-40 size-30">
                <svg className="rotate-[135deg] size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2" strokeDasharray="75 100" strokeLinecap="round"></circle>
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-400" strokeWidth="2" strokeDasharray="37.5 100" strokeLinecap="round"></circle>
                </svg>
                <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="sm:text-5xl xs:text-3xl text-xl font-bold text-white">50</span>
                  <span className="text-white block sm:text-xl xs:text-lg text-base">Saved</span>
                </div>
              </div>
              <div className="relative sm:size-40 size-30">
                <svg className="rotate-[135deg] size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2" strokeDasharray="75 100" strokeLinecap="round"></circle>
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-400" strokeWidth="2" strokeDasharray="22.5 100" strokeLinecap="round"></circle>
                </svg>
                <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="sm:text-5xl xs:text-3xl text-xl font-bold text-white">30</span>
                  <span className="text-white block sm:text-xl xs:text-lg text-base">Watched</span>
                </div>
              </div>
              <div className="relative sm:size-40 size-30">
                <svg className="rotate-[135deg] size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2" strokeDasharray="75 100" strokeLinecap="round"></circle>
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-400" strokeWidth="2" strokeDasharray="7.5 100" strokeLinecap="round"></circle>
                </svg>
                <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="sm:text-5xl xs:text-3xl text-xl font-bold text-white">10</span>
                  <span className="text-white block sm:text-lg xs:text-sm text-xs">Downloaded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfileUser
