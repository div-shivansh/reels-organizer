'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'


const Dashboard = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [linksData, setLinksData] = useState([])
  const [filteredreels, setFilteredreels] = useState([])
  const [search, setSearch] = useState('')
  const searchParams = useSearchParams()
  const filter = searchParams.get('filter') || 'all'

  const handlefilter = ({ tag }) => {
    router.push(`/dashboard?filter=${tag.toLowerCase()}`)
  }
  const handleDefaultfilter = (categoryArry) => {
   const catagoryParam = categoryArry.join("")
   console.log(categoryArry, catagoryParam)
   router.push(`/dashboard?filter=${catagoryParam}`)
  }
  const handleResetfilter = () => {
    router.push('/dashboard')
  }

  const handleRemains = () => {
    router.push("/dashboard?filter=others")
  }

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredreels(linksData)
    } else {
      const searchlower = search.toLowerCase()
      const filteredreels = linksData.filter(link =>
        link.caption.toLowerCase().includes(searchlower) ||
        link.hashtags?.some(hashtags => hashtags.toLowerCase().includes(searchlower)) ||
        link.owner.username.toLowerCase().includes(searchlower) ||
        link.owner.fullName.toLowerCase().includes(searchlower)
      )
      setFilteredreels(filteredreels)
    }
  }, [search, linksData])


  const handleDownload = async (e) => {
    e.preventDefault()
    const reeld = e.currentTarget.href
    const res = await fetch(reeld)
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = reeld.split('/').pop()
    document.body.appendChild(a)
    a.click()
  }

  useEffect(() => {
    const fetchlinksfromDB = async () => {
      try {
        const res = await fetch(`/api/getLinks?email=${session.user.email}`)
        const ldata = await res.json()

        if (ldata.success) {
          setLinksData(ldata.links)
        } else {
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
        }
      } catch (err) {
          toast.error('Please try again later', {
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
    }
    const fetchUserFromDB = async () => {
      try {
        const res = await fetch(`/api/getUser?email=${session.user.email}`)
        const udata = await res.json()

        if (udata.success) {
          setUserData(udata.user)
        } else {
            toast.warn('Please Create a profile for better personalization', {
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

  useEffect(() => {
    const userTags = userData?.tags?.map(tag => tag.toLowerCase()) || []

    if (filter === 'all') {
      setFilteredreels(linksData)
    } else if (filter === 'others') {
      const others = linksData.filter(link => {
        const hashtags = (link.hashtags || []).map(tag => tag.toLowerCase())

        if (hashtags.length === 0) return true;

        return !hashtags.some(tag => userTags.includes(tag))
      })

      setFilteredreels(others)
    } else {
      const filtered = linksData.filter(link =>
        link.hashtags?.some(tag => tag.toLowerCase().includes(filter))
      )
      setFilteredreels(filtered)
    }
  }, [filter, linksData, userData])

  const defaultFilters = [
    {name: "COMEDY", category: ["order"]},
    {name: "COMEDY", category: ["memes"]}
  ]
  console.log(defaultFilters)



  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className='flex items-center justify-center w-full h-screen bg-neutral-800'>
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }



  return (
    <div className='bg-neutral-800 min-h-[86vh] flex max-lg:flex-col text-white p-2'>
      <div className='left lg:border-r-2 lg:border-neutral-500 md:pr-4 lg:w-[20vw] sticky'>
        <div className='flex items-center justify-center xl:gap-3 gap-1 bg-neutral-700 xl:py-2 py-1 px-1 rounded-xl drop-shadow-xl max-lg:hidden'>
          <Image src={userData?.image || session?.user?.image || "/dummy-avatar.png"} width={60} height={60} alt='profile' className=' 2xl:size-15 lg:size-12 rounded-full hover:opacity-80 transition-all ease-in duration-100 cursor-pointer' />
          <div className='flex flex-col items-start justify-center truncate'>
            <h3 className='2xl:text-lg lg:text-base 2xl:font-medium truncate w-full'>{userData?.fname || "Your"} {userData?.lname || "Name"}</h3>
            <h4 className='2xl:text-sm text-xs text-green-400 truncate w-full'>@{userData?.username || "username"}</h4>
          </div>
          <Link href={"/profile"}>
            <span className='material-symbols-outlined redirect-icon text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]'>Open_In_New</span>
          </Link>
        </div>
        <div className='mt-3 flex flex-col'>
          <div className='flex items-center gap-5'>
            <h2 className='lg:text-2xl text-xl font-bold cursor-pointer' onClick={handleResetfilter}>Categories</h2>
          </div>
          <ul className='flex flex-col max-lg:flex-row w-full max-lg:overflow-x-auto lg:overflow-y-auto gap-2 lg:mt-4 mt-2'>
            {userData?.tags?.length === 0 || !userData && defaultFilters.map((filter, index) => {
              return (
                <div key={index}>
                  <h2 onClick={() => {handleDefaultfilter (filter.category)}}>Hello</h2>
                </div>
              )
            })}
            {userData?.tags?.map((tag, index) => {
              return (
                <div key={index} onClick={() => { handlefilter({ tag }) }} className="button group relative inline-flex justify-center truncate whitespace-nowrap rounded-full px-15 xs:py-2 py-1 h-fit text-center transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white mb-1">
                  <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 md:font-semibold max-xs:text-sm font-medium">{tag.toUpperCase()}</span>
                  <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                    <span className="button-type font-semibold text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">{tag.toUpperCase()}</span>
                  </div>
                </div>
              )
            })}
            <div onClick={handleRemains} className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 xs:py-2 py-1 h-fit text-center transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white mb-1">
              <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 md:font-semibold max-xs:text-sm font-medium">OTHERS</span>
              <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                <span className="button-type font-semibold text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">OTHERS</span>
              </div>
            </div>

          </ul>
        </div>
      </div>
      <div className='right md:p-2 w-full'>
        <div className="top border-b-2 border-neutral-500 md:px-4 h-16 flex items-center justify-between">
          <h1 className='xs:text-3xl text-2xl xs:font-bold font-semibold truncate'>
            {{ male: "Hello Bro!", female: "Hello Cutie!", other: "Hello there!" }[userData?.gender] || "Hello User!"}
          </h1>
          <input type="text" placeholder='Search...' onChange={(e) => setSearch(e.target.value)} value={search} className='bg-neutral-700 focus:outline-2 focus:outline-green-400 placeholder:text-white p-1 xs:px-3 px-2 rounded-lg max-sm:w-1/2 w-fit' />
        </div>
        <div className="content flex justify-center flex-col gap-2 my-1">
          <h2 className='xs:text-2xl text-lg font-semibold xs:font-bold cursor-pointer md:px-4' onClick={handleResetfilter}>Your Links</h2>
          <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-3 2xs:grid-cols-2 justify-center max-xs:gap-1 items-center overflow-y-auto overflow-x-hidden min-h-[56vh]'>
            {filteredreels && filteredreels.length > 0 ? (
              filteredreels.map((link, index) => {
                return (
                  <div key={index} className='flex justify-center items-center w-fit'>
                    <div className='flex flex-col items-start justify-center bg-neutral-700 sm:p-2 p-1 lg:w-58 sm:w-50 2xs:w-42 w-52 rounded-2xl drop-shadow-xl h-fit hover:-translate-y-1 transition-all duration-150 ease-in-out xs:m-2 truncate'>
                      <Image src={link.thumbnail} width={250} height={400} className='rounded-2xl lg:w-54 sm:w-46 2xs:w-40 lg:h-100 sm:h-85' alt='thumbnail' />
                      <p className='text-wrap h-6 my-1 break-words truncate text-start lg:w-54 sm:w-46 w-40 max-lg:text-sm' title={link.caption}>{link.caption}</p>
                      <div className="flex gap-2 items-center justify-center w-full">
                        <Link href={link.videoUrl} target='_blank' className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full sm:px-10 px-5 lg:py-1.5 py-1 text-center transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white">
                          <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 lg:font-semibold font-medium text-sm">Watch</span>
                          <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                            <span className="button-type font-semibold text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">Watch</span>
                          </div>
                        </Link>
                        <a onClick={handleDownload} href={link.videoUrl} target='_blank' className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full sm:px-10 px-5 lg:py-1.5 py-1 text-center transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white">
                          <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 lg:font-semibold font-medium text-sm">Download</span>
                          <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                            <span className="button-type font-semibold text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">Download</span>
                          </div>
                        </a>
                      </div>
                    </div>
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
