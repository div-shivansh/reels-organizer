'use client'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const Profile = () => {
    const searchParams = useSearchParams()

    const router = useRouter()

    const [email, setEmail] = useState(searchParams.get('email') || "")
    const [picture, setPicture] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")

    const submit = async (e) => {
        e.preventDefault();

        if (password !== confPassword) {
            alert("password and confirm password are not same")
        } else {


            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                email,
                picture,
                username,
                password,
                confPassword
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const r = await fetch("http://localhost:3000/api/add", requestOptions)
            const result = await r.json()
            if (result.success) {
                router.push(`/dashboard/${username}`)
            } else {
                alert("mail id already exists")

            }
        }
    }

    return (
        <div className="relative min-h-[86vh] text-white">

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-900 bg-[radial-gradient(#3d3d3d_0.5px,transparent_1px)] [background-size:16px_16px]"></div>
                <form onSubmit={submit} className='flex justify-center flex-col w-2/5 gap-5'>
                    <div className='mt-4'>
                        <span className='font-bold text-xl'>Select Your Gmail:</span>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='bg-neutral-600 p-2 w-full' placeholder='Enter Mail Id' />
                    </div>
                    <div className='mt-4'>
                        <span className='font-bold text-xl'>Select Your Profile Picture:</span>
                        <input value={picture} onChange={(e) => setPicture(e.target.value)} type="url" className='bg-neutral-600 p-2 w-full' placeholder='Enter Picture' />
                    </div>
                    <div className='mt-4'>
                        <span className='font-bold text-xl'>Select Your Username:</span>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className='bg-neutral-600 p-2 w-full' placeholder='Enter Username' />
                    </div>
                    <div className='mt-4'>
                        <span className='font-bold text-xl'>Select Your Password:</span>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='bg-neutral-600 p-2 w-full' placeholder='Enter Password' />
                    </div>
                    <div className='mt-4'>
                        <span className='font-bold text-xl'>Confirm Your Password:</span>
                        <input value={confPassword} onChange={(e) => setConfPassword(e.target.value)} type="password" className='bg-neutral-600 p-2 w-full' placeholder='Confirm Password' />
                    </div>
                    <div className='w-full mt-4'>
                        <button type='submit' className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-6 w-full py-1.5 text-center transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white">
                            <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">Submit</span>
                            <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                                <span className="button-type font-semibold text-black">Submit</span>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile
