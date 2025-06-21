'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const SignUp = () => {
    const router = useRouter()
    const [text, setText] = useState("")
    const mailSubmit = (e) => {
         e.preventDefault();
        router.push(`/profile?email=${text}`)
    }


    return (
        <div className="relative min-h-[86vh]">

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-900 bg-[radial-gradient(#3d3d3d_0.5px,transparent_1px)] [background-size:16px_16px]"></div>
                <form onSubmit={mailSubmit} className="content flex items-center justify-center flex-col gap-5">
                    <input onChange={(e) => setText(e.target.value)} value={text} type="email" placeholder='Enter Your Mail Id' className='bg-neutral-600 placeholder:text-gray-200 text-gray-200 p-2 rounded-lg selection:outline-2 pr-10' />
                    <button type='submit' className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-6 py-1.5 text-center transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white">
                        <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">Submit</span>
                        <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                            <span className="button-type font-semibold text-black">Submit</span>
                        </div>
                    </button>
                </form>
            </div>



        </div>
    )
}

export default SignUp
