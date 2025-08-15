"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'


const Submission = () => {

    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!session) {
            router.push("/login")
        }
    }, [session])

    if (status === "loading" || status === "unauthenticated") {
        return <div className='flex items-center justify-center w-full h-screen bg-neutral-800'>
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    }




    const handleSubmitReel = async () => {
        setLoading(true)
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                userEmail: session.user.email,
                url
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const r = await fetch("/api/submit", requestOptions)
            const res = await r.json()
            if (res.success) {
                toast.success('Reel has been submitted successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setUrl("")
            }

        } catch (error) {
            toast.error('Something went wrong. Try again later', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="flex flex-col justify-center gap-10 items-center bg-neutral-800 min-h-[calc(100vh-128px)] text-white px-5 md:px-20 lg:px-0">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className='flex flex-col items-center justify-center container w-full gap-2 mt-5'>
                <h1 className='lg:text-7xl md:text-6xl sm:text-4xl text-3xl text-center font-semibold lg:font-bold'>Submit Your Reels</h1>
                <h2 className='lg:text-2xl md:text-xl sm:text-lg 2xs:text-base text-sm text-neutral-400 text-center'>Paste the links to your favourite Instagram Reels to get them organized.</h2>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -50}}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className='flex flex-col items-center justify-center bg-neutral-700 px-5 md:px-15 md:py-20 py-15 rounded-2xl border border-neutral-500 my-10 drop-shadow-2xl gap-5 w-full lg:w-1/2'>
                <div className='flex justify-center items-center w-full'>
                    <span className='material-symbols-outlined border-2 border-white md:p-2.5 px-1 py-2.5 rounded-lg rounded-r-none border-r-0'>mail</span>
                    <input value={session.user.email || " "} readOnly className='bg-transparent border-2 border-l-0 outline-none border-white md:px-2 px-1 2xs:py-2 py-2.5 rounded-lg rounded-l-none text-neutral-500 w-full sm:text-xl 2xs:text-lg text-base' type="email" />
                </div>
                <div className='flex justify-center items-center w-full'>
                    <span className='material-symbols-outlined border-2 border-white md:p-2.5 px-1 py-2.5 rounded-lg rounded-r-none border-r-0'>link</span>
                    <input value={url} onChange={(e) => setUrl(e.target.value)} className='bg-transparent border-2 outline-none border-l-0 placeholder:text-neutral-300 border-white md:px-2 px-1 2xs:py-2 py-2.5 rounded-lg rounded-l-none w-full sm:text-xl 2xs:text-lg text-base' type="url" placeholder='Enter your Reel URL' />
                </div>
                {loading ? (
                    <div className='text-neutral-500 border-white rounded-full border-2 py-1.5 px-10'>Submitting...</div>
                ) : (
                    <motion.button onClick={handleSubmitReel}
              variants={{
                tap: { backgroundColor: "#FFFFFF", transition: { duration: 0.1, ease: "easeOut" }},
                hover: { backgroundColor: "#FFFFFF", transition: { duration: 0.2}}
              }}
              whileHover="hover"
              whileTap="tap"
              className="button relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 py-1.5 text-center border-2 border-white text-white cursor-pointer"
            >
              <motion.span
                initial={{ y: 0 }}
                variants={{
                  hover: { y: -40, transition: { duration: 0.2, ease: "easeInOut" } },
                  tap: { y: -40, transition: { duration: 0.1 } }
                }}
                transition={{ duration: 0.1 }}
                className="button-type font-semibold">Submit Your Links</motion.span>
              <motion.div
                  initial={{ y: 40 }}
                variants={{
                  hover: { y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
                  tap: { y: 0, transition: { duration: 0.1 } }
                }}
                className="absolute inset-0 flex items-center justify-center">
                <span className="button-type font-semibold text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">Submit Your Links</span>
              </motion.div>
            </motion.button>
                )}
            </motion.div>
        </div>
    )
}

export default Submission
