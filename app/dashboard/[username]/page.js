import Image from "next/image"
import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation"

export default async function Page({ params }) {
    const { username } = await params
    const client = await clientPromise
    const db = client.db("reelOrganizer")
    const collection = db.collection("userCredentials")

    const item = await collection.findOne({username})
    if(!item){
        return notFound()
    }
    return (
        <div>
            
        </div>
    )
}