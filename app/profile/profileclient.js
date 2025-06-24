'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Image from 'next/image'
import { Calendar as CalendarIcon } from 'lucide-react';

const ProfileClient = () => {

    const router = useRouter()
    const { data: session, status } = useSession()

    const [handle, setHandle] = useState("@")
    const [number, setNumber] = useState("+91")
    const [file, setFile] = useState(null)
    const [picture, setPicture] = useState("")
    const [username, setUsername] = useState("")
    const [fname, setFname] = useState("")
    const [gender, setGender] = useState("")
    const [dob, setDob] = useState("")
    const [lname, setLname] = useState("")
    const [tags, setTags] = useState([])
    const [input, setInput] = useState("")
    const [bio, setBio] = useState("")

    useEffect(() => {

        if (status === 'unauthenticated') {
            router.push("/login")
        }
        if (session?.user) {
            let name = session.user.name.split(" ")
            let firstName = name[0] || "";
            let lastName = name[1] || "";
            setLname(lastName || lname)
            setFname(firstName || fname)
            setFile(session.user.image || file)
        }

    }, [session, status, router])

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && input.trim()) {
            e.preventDefault();
            if (!tags.includes(input.trim())) {
                setTags([...tags, input.trim()]);
            }
            setInput("");
        }
        if (e.key === "Backspace" && !input && tags.length) {
            setTags(tags.slice(0, -1));
        }
    };
    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(file);
            setPicture(imageUrl); // This updates the preview image
        }
    };

    if (status === 'loading' || status === 'unauthenticated') {
        return <div className="text-white">Loading...</div>
    }

    const submit = async (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            email: session.user.email,
            username,
            fname,
            lname,
            image: picture || session.user.image,
            gender,
            dob,
            handle,
            number,
            tags,
            bio
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const r = await fetch("/api/add", requestOptions)
        const result = await r.json()
        if (result.success) {
            router.push(`/dashboard`)
        } else {
            console.error(result.message);
            

        }
    }

    return (
        <div className="relative min-h-[86vh] text-white">

            <div className="absolute inset-0">
                <div className="absolute inset-0 -z-10 w-full h-auto bg-neutral-900 bg-[radial-gradient(#3d3d3d_0.5px,transparent_1px)] [background-size:16px_16px]"></div>
                <h1 className='text-4xl font-bold text-start px-45 pt-5'>Edit Profile</h1>
                <form className='flex items-start justify-center flex-col container mx-auto p-5 gap-10' onSubmit={submit}>
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-2xl font-bold text-start'>Profile picture</h3>
                        <div className='img flex items-center justify-center gap-7'>
                            <Image src={picture || session.user.image} width={100} height={100} alt='profile' className='size-25 object-cover rounded-full selection:bg-transparent hover:opacity-90 transition-all duration-150' />
                            <div className='flex flex-col items-start justify-center gap-3'>
                                <label htmlFor="filechose" className='button group relative inline-flex justify-center overflow-hidden whitespace-nowrap cursor-pointer rounded-full px-6 py-1 text-center transition-all duration-300 border border-transparent bg-transparent text-white hover:bg-white hover:text-black outline-2 outline-white outline-offset-2'>
                                    <span className='button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold'>Upload Photo</span>
                                    <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0"><span className="button-type font-semibold">Upload Photo</span></div>
                                    <input type="file" id='filechose' accept='image/*' onChange={handleImageChange} className='hidden' />
                                </label>
                                <span className='text-sm text-gray-400'>Atlest 256 x 256px PNG or JPG file</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-start justify-between w-full'>
                        <section className="basic flex items-start justify-center flex-col gap-5 w-5/12">
                            <h2 className='text-2xl font-bold mb-4'>Basic Information</h2>
                            <div className='flex gap-3 flex-col w-full'>
                                <h3 className='text-lg font-semibold text-start'>Display Name<span className='text-red-500'>&#42;</span></h3>
                                <div className='flex gap-4 w-full'>
                                    <input value={fname} onChange={(e) => setFname(e.target.value)} className='bg-transparent outline-2 outline-white px-2 py-1 rounded-lg w-full' type="text" placeholder='First Name' />
                                    <input value={lname} onChange={(e) => setLname(e.target.value)} className='bg-transparent outline-2 outline-white px-2 py-1 rounded-lg w-full' type="text" placeholder='Last Name' />
                                </div>
                            </div>
                            <div className='flex gap-4 w-full'>
                                <div className='flex gap-3 flex-col w-full'>
                                    <h3 className='text-lg font-semibold text-start'>Email <span className='text-red-500'>&#42;</span></h3>
                                    <input readOnly value={session.user.email} className='bg-transparent outline-2 outline-white px-2 py-1 rounded-lg text-gray-500' type="email" placeholder='Enter Email' />
                                </div>
                                <div className='flex gap-3 flex-col w-full'>
                                    <h3 className='text-lg font-semibold text-start'>Username<span className='text-red-500'>&#42;</span></h3>
                                    <input value={username} onChange={(e) => setUsername(e.target.value)} className='bg-transparent outline-2 outline-white px-2 py-1 rounded-lg' type="text" placeholder='Enter Username' />
                                </div>
                            </div>
                            <div className='w-full flex gap-4'>
                                <div className='flex gap-3 flex-col w-full'>
                                    <h3 className='text-lg font-semibold text-start'>Date of Birth</h3>
                                    <div className="relative">
                                        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="bg-transparent outline-2 outline-white px-2 py-1 rounded-lg w-full pr-10" />
                                        <span className="absolute right-3 top-2 text-white pointer-events-none">
                                            <CalendarIcon className="w-5 h-5" />
                                        </span>
                                    </div>
                                </div>
                                <div className='flex gap-3 flex-col w-full'>
                                    <h3 className='text-lg font-semibold text-start'>Gender</h3>
                                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="bg-transparent outline-2 outline-white px-2 py-1 rounded-lg text-zinc-500">
                                        <option value="">Select your Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                        <option value="prefer_not">Prefer not to say</option>
                                    </select>
                                </div>
                            </div>
                            <button type='submit' className="button group relative inline-flex justify-center mt-15 overflow-hidden whitespace-nowrap rounded-full cursor-pointer px-10 py-1.5 text-center transition-all duration-300 outline-2 outline-offset-2 outline-white bg-transparent text-white hover:bg-white ">
                                <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">Submit</span>
                                <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                                    <span className="button-type font-semibold text-black">Submit</span>
                                </div>
                            </button>
                        </section>
                        <section className="other flex items-start justify-center flex-col gap-5 w-5/12">
                            <h2 className='text-2xl font-bold mb-4'>More about you</h2>
                            <div className='flex gap-4 w-full'>
                                <div className='flex flex-col gap-3 w-full'>
                                    <h3 className='text-lg font-semibold text-start'>Instagram handle</h3>
                                    <input value={handle} onChange={(e) => setHandle(e.target.value)} className='bg-transparent outline-2 outline-white px-2 py-1 rounded-lg' type="text" placeholder='@' />
                                </div>
                                <div className='flex flex-col gap-3 w-full'>
                                    <h3 className='text-lg font-semibold text-start'>WhatsApp No.</h3>
                                    <input value={number} onChange={(e) => setNumber(e.target.value)} className='bg-transparent outline-2 outline-white px-2 py-1 rounded-lg' type="tel" placeholder='+91' />
                                </div>
                            </div>
                            <span className='text-sm text-gray-400 mt-[-16]'>NOTE:- For Updates and some Chit chat :&#41; </span>
                            <div className="w-full">
                                <label className="text-lg font-semibold">Interests</label>
                                <div className="flex flex-wrap gap-2 bg-transparent outline-2 outline-white px-3 max-h-25 overflow-auto py-2 rounded-lg">
                                    {tags.map((tag, index) => (
                                        <div key={index} className="flex items-center gap-1.5 bg-transparent text-white outline outline-white hover:outline-none hover:bg-white hover:text-black transition-all ease-in duration-150 cursor-default px-3 py-1 rounded-full text-sm">
                                            <span>{tag}</span>
                                            <button type="button" className="text-red-600 hover:text-red-800 font-bold cursor-pointer" onClick={() => removeTag(index)}>
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} className="bg-transparent outline-none flex-grow w-full text-white" placeholder="Press Enter to add"
                                    />
                                </div>
                            </div>
                            <h3 className='text-lg font-semibold text-start'>Bio&#40;About yourself&#41;</h3>
                            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className='bg-transparent outline-2 outline-white px-3 py-2 rounded-lg w-full min-h-32' type="text" placeholder='Something about yourself. If you are creative enough'></textarea>
                        </section>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ProfileClient
