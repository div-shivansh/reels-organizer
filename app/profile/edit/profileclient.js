'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Image from 'next/image'
import { Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const ProfileClient = ({ userData: actualdata }) => {

    const router = useRouter()
    const { data: session, status } = useSession()

    const [handle, setHandle] = useState("")
    const [number, setNumber] = useState("")
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [uploadedUrl, setUploadedUrl] = useState("")
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

        if (actualdata) {
            setHandle(actualdata.handle || "")
            setNumber(actualdata.number || "")
            setUploadedUrl(actualdata.image || "")
            setGender(actualdata.gender || "")
            setUsername(actualdata.username || "")
            setFname(actualdata.fname || "")
            setLname(actualdata.lname || "")
            setDob(actualdata.dob || "")
            setTags(actualdata.tags || [])
            setBio(actualdata.bio || "")

        } else if (session?.user) {
            let name = session.user.name.split(" ")
            let firstName = name[0] || "";
            let lastName = name[1] || "";
            setLname(lastName || lname)
            setFname(firstName || fname)
            setFile(session.user.image || file)
        }

    }, [session, status, router, actualdata])

    const handleSpaceKey = (e) => {
        const val = e.target.value
        if (val.endsWith(" ")) {
            const newTag = val.trim()
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag])
            }
            setInput("")
        } else {
            setInput(val)
        }
    };
    const handleBackKey = (e) => {

        if (e.key === "Backspace" && !input && tags.length) {
            e.preventDefault()
            setTags(tags.slice(0, -1));
        }
    }
    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleImageChange = async (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);

            const formdata = new FormData();
            setUploading(true);
            formdata.append("file", selectedFile);

            try {
                const res = await fetch("/api/imageupload", {
                    method: "POST",
                    body: formdata,
                });

                const data = await res.json();

                if (res.ok) {
                    setUploadedUrl(data.url);
                    console.log(data)
                    toast.success(data.message || "Image uploaded successfully", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else {
                    toast.error(data.message || "Something happened while uploading", {
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
                toast.error(error.message || "Something went wrong", {
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
                setUploading(false);
            }
        } else {
            toast.error('Please Select a valid image', {
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
    };

    if (status === 'loading' || status === 'unauthenticated') {
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

    const submit = async (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            email: session.user.email,
            username,
            fname,
            lname,
            image: uploadedUrl || session.user.image,
            gender,
            dob,
            handle,
            number,
            tags,
            bio,
            isProfileComplete: true
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
            toast.success(result.message || 'Profile updated successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            router.push(`/dashboard`)
        } else {
            toast.error(result.message || 'Something went wrong. Please reload or try later', {
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

    return (
        <div className="min-h-[86vh] text-white bg-neutral-900">
            <form className='flex items-start justify-center flex-col lg:container lg:mx-auto w-full p-5 gap-10' onSubmit={submit}>
                <h1 className='text-4xl font-bold text-start pt-5 '>Edit Profile</h1>
                <div className='flex flex-col gap-5 xs:bg-neutral-800 w-full xs:items-start items-center justify-center xs:px-10 py-5 rounded-2xl drop-shadow-xl'>
                    <h3 className='xs:text-3xl text-2xl font-semibold text-start'>Profile Picture</h3>
                    <div className='img flex max-xs:flex-col items-center justify-center gap-7'>
                        <Image src={uploadedUrl || session.user.image} width={120} height={120} alt='profile' priority className='xs:size-30 size-20 object-cover rounded-full selection:bg-transparent hover:opacity-90 transition-all duration-150' />
                        <div className='flex flex-col xs:items-start justify-center gap-3'>
                            {uploading ? (
                                <div className='text-neutral-500 border-white rounded-full border-2 py-1.5 px-10'>Uploading...</div>
                            ) : (
                                <motion.label htmlFor="filechose" 
                                variants={{
                            tap: { backgroundColor: "white", transition: { duration: 0.1, ease: "easeOut" } }
                          }}
                          whileHover="hover"
                          whileTap="tap"
                          className="button relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-6 py-1 text-center border-2 border-white text-white bg-transparent hover:bg-white transition-all duration-200"
                        >
                          <motion.span
                            initial={{ y: 0 }}
                            variants={{
                              hover: { y: -40, transition: { duration: 0.2, ease: "easeInOut" } },
                              tap: { y: -40, transition: { duration: 0.1 } }
                            }}
                            transition={{ duration: 0.1 }}
                            className="button-type font-semibold">Upload</motion.span>
                          <motion.div
                            initial={{ y: 40 }}
                            variants={{
                              hover: { y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
                              tap: { y: 0, transition: { duration: 0.1 } }
                            }}
                            className="absolute inset-0 flex items-center justify-center">
                            <span className="button-type font-semibold text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">Upload</span>
                          </motion.div>
                                    <input type="file" id='filechose' accept='image/*' onChange={handleImageChange} className='hidden' />
                                </motion.label>
                            )}
                            <span className='text-sm text-gray-400'>Atlest 256 x 256px PNG or JPG file</span>
                        </div>
                    </div>
                </div>
                <div className='flex items-start max-lg:flex-col gap-10 lg:justify-between justify-center w-full xs:bg-neutral-800 xs:px-10 py-5 lg:gap-15 rounded-2xl drop-shadow-xl'>
                    <section className="basic flex items-start justify-center flex-col gap-5 w-full">
                        <h2 className='xs:text-3xl text-2xl font-semibold mb-4'>Basic Information</h2>
                        <div className='flex gap-3 flex-col w-full'>
                            <h3 className='text-lg font-medium text-start'>Display Name<span className='text-red-500'>&#42;</span></h3>
                            <div className='flex md:gap-15 xs:gap-5 gap-2 w-full'>
                                <input value={fname} onChange={(e) => setFname(e.target.value)} className='bg-transparent xs:text-lg text-base outline outline-white p-2 rounded-lg w-full' type="text" placeholder='First Name' />
                                <input value={lname} onChange={(e) => setLname(e.target.value)} className='bg-transparent xs:text-lg text-base outline outline-white p-2 rounded-lg w-full' type="text" placeholder='Last Name' />
                            </div>
                        </div>
                        <div className='flex gap-3 flex-col w-full'>
                            <h3 className='text-lg font-medium text-start'>Email <span className='text-red-500'>&#42;</span></h3>
                            <input readOnly value={session.user.email} className='bg-transparent outline outline-white p-2 xs:text-lg text-base rounded-lg text-gray-500' type="email" placeholder='Enter Email' />
                        </div>
                        <div className='flex w-full max-md:flex-col md:gap-15 gap-5'>
                            <div className='flex gap-3 flex-col w-full'>
                                <h3 className='text-lg font-medium text-start'>Username<span className='text-red-500'>&#42;</span></h3>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} className='bg-transparent outline xs:text-lg text-base outline-white p-2 rounded-lg' type="text" placeholder='Enter Username' />
                            </div>
                            <div className='flex gap-3 flex-col w-full'>
                                <h3 className='text-lg font-medium text-start'>Date of Birth</h3>
                                <div className="relative items-center justify-center">
                                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="bg-transparent outline xs:text-lg text-base outline-white p-2 rounded-lg w-full pr-10" />
                                    <span className="absolute right-3 top-3 flex items-center justify-center text-white pointer-events-none">
                                        <CalendarIcon className="w-5 h-5" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex gap-4'>
                            <div className='flex gap-3 flex-col w-full'>
                                <h3 className='text-lg font-medium text-start'>Gender</h3>
                                <select value={gender} onChange={(e) => setGender(e.target.value)} className="bg-transparent xs:text-lg text-base outline outline-white p-2 rounded-lg text-white">
                                    <option value="" className='text-white bg-neutral-600'>Select your Gender</option>
                                    <option value="male" className='text-white bg-neutral-600 '>Male</option>
                                    <option value="female" className='text-white bg-neutral-600 '>Female</option>
                                    <option value="other" className='text-white bg-neutral-600 '>Other</option>
                                    <option value="prefer_not" className='text-white bg-neutral-600 '>Prefer not to say</option>
                                </select>
                            </div>
                        </div>
                    </section>
                    <section className="other flex items-start justify-center flex-col gap-5 w-full">
                        <h2 className='xs:text-3xl text-2xl font-semibold mb-4'>More about you</h2>
                        <div className='flex flex-col gap-3 w-full'>
                            <h3 className='text-lg font-medium text-start'>Instagram handle</h3>
                            <div className='flex w-full'>
                                <input type="text" className='bg-transparent border border-r-0 w-7 placeholder:text-white rounded-r-none xs:text-lg text-base outline-none border-white pl-1 py-2 rounded-lg placeholder:' placeholder='@' readOnly />
                                <input value={handle} onChange={(e) => setHandle(e.target.value)} className='bg-transparent border xs:text-lg text-base border-l-0 outline-none rounded-l-none border-white pr-1.5 py-2 rounded-lg w-full' type="text" />
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                            <h3 className='text-lg font-medium text-start'>WhatsApp No.</h3>
                            <div className='flex w-full'>
                                <input type="text" className='bg-transparent border border-r-0 w-10 placeholder:text-white xs:text-lg text-base rounded-r-none outline-none border-white pl-2 py-2 rounded-lg placeholder:' placeholder='+91' readOnly />
                                <input value={number} onChange={(e) => setNumber(e.target.value)} className='bg-transparent border border-l-0 outline-none rounded-l-none border-white pr-3 py-2 rounded-lg xs:text-lg text-base w-full' type="number" />
                            </div>
                            <span className='xs:text-sm text-xs text-gray-400 '>NOTE:- For Updates and some Chit chat :&#41; </span>
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <label className="text-lg font-medium">Interests</label>
                            <div className="flex flex-wrap gap-2 bg-transparent outline outline-white px-3 min-h-25 overflow-auto py-2 rounded-lg">
                                {tags.map((tag, index) => (
                                    <div key={index} className="flex items-center gap-1.5 bg-transparent text-white outline outline-white hover:outline-none hover:bg-white hover:text-black transition-all ease-in duration-150 cursor-default px-3 rounded-full xs:text-lg text-base">
                                        <span>{tag}</span>
                                        <button type="button" className="text-red-600 hover:text-red-800 font-semibold cursor-pointer" onClick={() => removeTag(index)}>
                                            &times;
                                        </button>
                                    </div>
                                ))}
                                <input type="text" value={input} onChange={handleSpaceKey} onKeyDown={handleBackKey} className="bg-transparent outline-none flex-grow w-full text-white xs:placeholder:text-lg placeholder:text-base xs:text-lg text-base" placeholder="Press Space to add"
                                />
                            </div>
                        </div>
                        <h3 className='text-lg font-medium text-start'>Bio&#40;About yourself&#41;</h3>
                        <textarea value={bio} onChange={(e) => setBio(e.target.value)} className='bg-transparent outline outline-white px-3 py-2 xs:text-lg text-base xs:placeholder:text-lg placeholder:text-base rounded-lg w-full min-h-32' type="text" placeholder='Something about yourself. If you are creative enough'></textarea>
                    </section>
                </div>
                <div className='w-full lg:justify-end justify-center flex px-10'>
                    <motion.button type='submit'
                        variants={{
                            tap: { backgroundColor: "white", transition: { duration: 0.1, ease: "easeOut" } }
                        }}
                        whileHover="hover"
                        whileTap="tap"
                        className="button relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full max-lg:w-full px-10 py-1.5 text-center border-2 border-white text-white bg-transparent hover:bg-white transition-all duration-200"
                    >
                        <motion.span
                            initial={{ y: 0 }}
                            variants={{
                                hover: { y: -40, transition: { duration: 0.2, ease: "easeInOut" } },
                                tap: { y: -40, transition: { duration: 0.1 } }
                            }}
                            transition={{ duration: 0.1 }}
                            className="button-type font-semibold">Submit</motion.span>
                        <motion.div
                            initial={{ y: 40 }}
                            variants={{
                                hover: { y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
                                tap: { y: 0, transition: { duration: 0.1 } }
                            }}
                            className="absolute inset-0 flex items-center justify-center">
                            <span className="button-type font-semibold text-transparent bg-clip-text bg-[linear-gradient(115deg,_#f9ce34,_#ee2a7b,_#6228d7)]">Submit</span>
                        </motion.div>
                    </motion.button>
                </div>
            </form>
        </div>
    )
}

export default ProfileClient
