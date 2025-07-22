"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import * as motion from "motion/react-client"

const Navbar = () => {
    const { data: session } = useSession()
    const [isopen, setIsopen] = useState(false)
    const [profileImage, setProfileImage] = useState("")
    
    const toggledropdown = () => {
        setIsopen(!isopen)
    }

    useEffect(() => {
    const fetchUserFromDB = async () => {
      try {
        const res = await fetch(`/api/getUser?email=${session.user.email}`)
        const data = await res.json()

        if (data.success && data.user.image) {
          setProfileImage(data.user.image)  // Use image from DB
        } else {
          setProfileImage(session.user.image || "") // fallback to session image
        }
      } catch (err) {
        console.error("Failed to load user", err)
        setProfileImage(session?.user?.image || "")
      }
    }

    if (session?.user?.email) {
      fetchUserFromDB()
    }
  }, [session])
    

    return (
        <div className='bg-black text-white flex items-center justify-between p-4 px-20 sticky top-0 z-50'>
            <Link href={"/"}><div className="logo flex items-center justify-between">
                <span className='text-2xl font-bold'>Reels</span>&nbsp;
                <span className='text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)] font-bold text-2xl'>Organizer</span>
            </div></Link>
            <div className='flex items-center justify-center gap-6'>
                <Link href={"/"} className='relative text-white hover:text-white transition-all ease-in before:transition-[width] before:ease-in before:duration-200 before:absolute before:bg-white before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in after:duration-200 after:absolute after:bg-white after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'>
                    <span className='font-semibold'>Home</span>
                </Link>

                <Link href={"/dashboard"} className='relative text-white hover:text-white transition-all ease-in before:transition-[width] before:ease-in before:duration-200 before:absolute before:bg-white before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in after:duration-200 after:absolute after:bg-white after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'>
                    <span className='font-semibold'>Dashboard</span>
                </Link>

                <Link href={"/profile"} className='relative text-white hover:text-white transition-all ease-in before:transition-[width] before:ease-in before:duration-200 before:absolute before:bg-white before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in after:duration-200 after:absolute after:bg-white after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'>
                    <span className='font-semibold'>Profile</span>
                </Link>

                <Link href={"/about"} className='relative text-white hover:text-white transition-all ease-in before:transition-[width] before:ease-in before:duration-200 before:absolute before:bg-white before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in after:duration-200 after:absolute after:bg-white after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'>
                    <span className='font-semibold'>About Us</span>
                </Link>
                {session?.user && <div className="image flex justify-center items-center">
                    <Image src={profileImage || "/dummy-avatar.png"} width={40} height={40} alt="   picture" className='rounded-full hover:p-0.5 hover:bg-white transition-all ease-in duration-100 cursor-pointer' />
                    <motion.svg animate={{rotate: isopen? 180:0}} width="40" height="40" viewBox="0 0 24 24" className="cursor-pointer" onClick={toggledropdown} fill="none">
                        <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
                    </motion.svg>
                    {isopen && <motion.ul initial={{opacity: 0, scale: 0}} whileInView={{opacity: 1, scale: 1}} className=' cursor-pointer absolute top-15 right-20 bg-black text-white px-2 py-4 rounded-md'>
                        <li className='cursor-pointer' onClick={() => {signOut()}}>Log Out</li> <hr />
                        <li><Link href={'/profile'}>Profile</Link></li>
                    </motion.ul>}
                </div>
                }
                {!session &&
                    <div className="buttons flex justify-center items-center gap-3 ml-10 ">
                        <Link href={"/login"}><div className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-6 py-1.5 text-center transition-all duration-300 border border-transparent bg-red-600 text-white hover:bg-red-800">
                            <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">Login</span>
                            <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                                <span className="button-type font-semibold">Login</span>
                            </div>
                        </div></Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar
