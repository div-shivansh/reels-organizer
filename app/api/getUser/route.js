import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Credentials from "@/models/Credentials";

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if(!email) {
        return NextResponse.json({ success: false, message: "Email missing" }, {status: 400})
    }

    await connectDB()
    const user = await Credentials.findOne({email})
    console.log(user)

    if (!user) {
        return NextResponse.json({ success: false, message: "User not found"}, {status: 404})
    }

    return NextResponse.json({success: true, user})

}