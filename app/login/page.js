'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthButton() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/profile")
        }
    }, [status, router])

    return (
        <div className="relative min-h-[86vh] text-white">

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-900 bg-[radial-gradient(#3d3d3d_0.5px,transparent_1px)] [background-size:16px_16px]"></div>
                <button onClick={() => signIn('google')} className='flex items-center justify-center gap-3 bg-neutral-700 px-5 py-2 rounded-md border-2 border-gray-300 text-lg font-semibold cursor-pointer'>
                    <Image src={"/Google-icon.png"} width={1000} height={1000} alt='G' className='size-8'/>
                    Sign in with Google</button>
            </div>
        </div>
    )
}
