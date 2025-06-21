import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db("reelOrganizer")
    const usercollection = db.collection("userCredentials")

    const doc = await usercollection.findOne({email: body.email})

    if(doc){
         return Response.json({success: false, error: true, message: 'Credentials are not available', result: null})
    }

    const result = await usercollection.insertOne(body)
    return Response.json({success: true, error: false, message: 'User updated in database Successfully', result: result})
}