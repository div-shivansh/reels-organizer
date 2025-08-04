"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Submission = () => {

    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const { data: session } = useSession()
    const router = useRouter()


    if (!session) {
        router.push("/login")
        return null
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
                alert("Your Reel has been submitted successfully!")
                setUrl("")
            }

        } catch (error) {
            console.error("error submitting reel:", error)
            alert("submission failed")
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="relative min-h-[86vh] text-white">

            <div className="absolute inset-0 flex items-center justify-start pt-20 flex-col gap-30">
                <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-900 bg-[radial-gradient(#3d3d3d_0.5px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className='flex flex-col items-center justify-center container w-full gap-2'>
                    <h1 className='text-7xl font-bold'>Submit Your Reels</h1>
                    <p className='text-2xl text-neutral-400'>Paste the links to your favourite Instagram Reels to get them organized.</p>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-neutral-700 px-15 py-20 rounded-2xl border border-black drop-shadow-2xl gap-5 w-1/2'>
                    <div className='flex justify-center w-full'>
                    <span className='material-symbols-outlined border-2 border-white p-2 rounded-lg rounded-r-none border-r-0'>mail</span>
                    <input value={session.user.email} readOnly className='bg-transparent border-2 border-l-0 outline-none border-white px-2 py-2 rounded-lg rounded-l-none text-neutral-500 w-full text-xl' type="email" />
                    </div>
                    <div className='flex justify-center w-full'>
                    <span className='material-symbols-outlined border-2 border-white p-2 rounded-lg rounded-r-none border-r-0'>link</span>
                    <input value={url} onChange={(e) => setUrl(e.target.value)} className='bg-transparent border-2 outline-none border-l-0 placeholder:text-neutral-300 border-white px-2 py-2 rounded-lg rounded-l-none w-full text-xl' type="url" placeholder='Enter your Reel URL' />
                    </div>
                    {loading ? (
                        <div className='text-neutral-500 border-white rounded-full border-2 py-1.5 px-10'>Submitting...</div>
                    ): (
                        <button onClick={handleSubmitReel} className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-10 py-1.5 text-center cursor-pointer transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white">
                        <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">Submit your links</span>
                        <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                            <span className="button-type font-semibold text-black">Submit your links</span>
                        </div>
                    </button>
                    )}
                    </div>
                </div>
            </div>
    )
}

export default Submission
