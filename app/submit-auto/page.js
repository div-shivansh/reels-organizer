"use client"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"

export default function SubmitAuto() {
    const router = useRouter()
    const searchParam = useSearchParams()
    const { data : session } = useSession()

    useEffect(() => {
        const url = searchParam.get("url")
        console.log(url)

        // if(url && session?.user?.email) {
        //     fetch("/api/submit", {
        //         method: "POST",
        //         headers: {"Content-Type": "application/json"},
        //         body: JSON.stringify({
        //             userEmail: session.user.email,
        //             url
        //         })
        //     }).then(() => {
        //         router.push("/")
        //     })
        // }
      
    }, [router, searchParam, session])
    
    return <p>This is an automated page. SO please don't waste your time here.</p>
}