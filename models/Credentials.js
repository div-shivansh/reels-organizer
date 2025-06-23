import mongoose from "mongoose"

const CredentialsSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    fname: {type: String, required: true},
    lname: String,
    gender: String,
    image: String,
    dob: String,
    handle: String,
    number: String,
    tags: [String],
    bio: String,
    isProfileComplete: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true})

export default mongoose.models.Credentials || mongoose.model("Credentials", CredentialsSchema)
