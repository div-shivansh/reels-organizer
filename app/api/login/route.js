import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("reelOrganizer");
    const usercollection = db.collection("userCredentials");

    // Find user by username
    const user = await usercollection.findOne({ username: body.username });

    if (!user) {
        return Response.json({ success: false, message: "User not found" });
    }
    if (user.password !== body.password) {
        return Response.json({ success: false, message: "Incorrect password" });
    }

    return Response.json({ success: true, message: "Login successful", user });
}