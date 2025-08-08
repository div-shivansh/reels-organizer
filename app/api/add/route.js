import connectDB from "@/lib/mongodb";
import Credentials from "@/models/Credentials";

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();

        console.log("Incoming body:", body)

        const existUser = await Credentials.findOne({email: body.email});

        
        if(existUser) {
            const updateUser = await Credentials.findOneAndUpdate(
                {email: body.email},
                {$set: {...body}},
                {new: true}
        )
            return Response.json({
                success: true,
                error: false,
                message: "User updated successfully",
                result: updateUser
            }, {status: 200})
        }

        const newUser = await Credentials.create({
            ...body,
            isProfileComplete: body.isProfileComplete ?? false
        });

        

        return Response.json({
            success: true,
            error: false,
            message: "user created successfully",
            result: newUser
        }, {status: 201})
    } catch (error) {
        console.error("Error saving user:", error)
        return Response.json({
            success: false,
            error: true,
            message: "something went wrong",
            result: null
        }, {status: 500})
    }
}