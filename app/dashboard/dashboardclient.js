'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'


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
  const handleResetfilter = () => {
    router.push('/dashboard')
  }

  const handleRemains =() => {
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



  if (status === "loading" || status === "unauthenticated") {
    return (
      <div>Loading...</div>
    )
  }



  return (
    <div className='bg-neutral-800 min-h-[86vh] flex text-white p-2'>
      <div className='left border-r-2 border-neutral-500 pr-4 w-[20vw] sticky'>
        <div className='flex items-center justify-center gap-3 bg-neutral-700 p-2 rounded-xl drop-shadow-xl'>
          <Image src={userData?.image || session?.user?.image || "/dummy-avatar.png"} width={60} height={60} alt='profile' className=' size-15 rounded-full hover:opacity-80 transition-all ease-in duration-100 cursor-pointer' />
          <div className='flex flex-col items-start justify-center truncate'>
            <h3 className='text-lg font-medium truncate'>{userData?.fname || "Your"} {userData?.lname || "Name"}</h3>
            <h4 className='text-sm text-green-400 truncate'>@{userData?.username || "@username"}</h4>
          </div>
          <Link href={"/profile"}>
            <span className='material-symbols-outlined icon text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]'>Open_In_New</span>
          </Link>
        </div>
        <div className='mt-3 flex flex-col'>
          <div className='flex items-center gap-5'>
          <span className='material-symbols-outlined icon-sm'>Category</span>
          <h2 className='text-2xl font-bold cursor-pointer' onClick={handleResetfilter}>Categories</h2>
          </div>
          <ul className='flex flex-col gap-2 mt-4'>
            {userData?.tags?.map((tag, index) => {
              return (
                <div key={index} onClick={() => { handlefilter({ tag }) }} className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 py-2 text-center transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white">
                  <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">{tag.toUpperCase()}</span>
                  <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                    <span className="button-type font-semibold text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">{tag.toUpperCase()}</span>
                  </div>
                </div>
              )
            })}
            <div onClick={handleRemains} className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 py-1.5 text-center transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white">
              <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">OTHERS</span>
              <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                <span className="button-type font-semibold text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">OTHERS</span>
              </div>
            </div>

          </ul>
        </div>
      </div>
      <div className='right p-2 w-full'>
        <div className="top border-b-2 border-neutral-500 px-4 h-16 flex items-center justify-between">
          <h1 className='text-3xl font-bold'>
            {{ male: "Hello Bro!", female: "Hello Cutie!", other: "Hello there!" }[userData?.gender] || "Hello User!"}
          </h1>
          <input type="text" placeholder='Search...' onChange={(e) => setSearch(e.target.value)} value={search} className='bg-neutral-700 focus:outline-2 focus:outline-green-400 placeholder:text-white p-1 px-3 rounded-lg' />
        </div>
        <div className="content flex justify-center flex-col gap-2 my-1">
          <h2 className='text-2xl font-bold cursor-pointer px-4' onClick={handleResetfilter}>Your Links</h2>
          <div className='grid 2xl:grid-cols-5  justify-center items-center overflow-y-auto h-[68vh]'>
            {filteredreels && filteredreels.length > 0 ? (
              filteredreels.map((link, index) => {
                return (
                  <div key={index} className='flex justify-center items-center w-fit'>
                    <div className='flex flex-col items-center justify-center bg-neutral-700 p-2 w-58 rounded-2xl drop-shadow-xl h-fit hover:-translate-y-1 transition-all duration-150 ease-in-out m-2 truncate'>
                      <Image src={link.thumbnail} width={250} height={400} className='rounded-2xl' alt='thumbnail' />
                      <p className='text-wrap h-6 my-1 break-words truncate text-start w-54' title={link.caption}>{link.caption}</p>
                      <div className="flex gap-2 items-center justify-center w-full">
                        <Link href={link.videoUrl} target='_blank' className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 py-1.5 text-center transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white">
                          <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">Watch</span>
                          <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                            <span className="button-type font-semibold text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">Watch</span>
                          </div>
                        </Link>
                        <a onClick={handleDownload} href={link.videoUrl} target='_blank' className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 py-1.5 text-center transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white">
                          <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">Download</span>
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
