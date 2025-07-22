import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Reellinks from "@/models/Reellinks";

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const email = searchParams.get("email")

    if(!email) {
        return NextResponse.json({success: false, message: "Email missing"}, {status:400})
    }

    await connectDB()
    const links = await Reellinks.find({submittedBy: email})

    if (!links) {
        return NextResponse.json({success: false, message: "No reels saved"}, {status: 404})
    }

    return NextResponse.json({success: true, links})
}