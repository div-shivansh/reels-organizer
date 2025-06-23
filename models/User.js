import mongoose from "mongoose"
const {Schema, model, models} = mongoose

const userSchema = new Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    image: String,
    isProfileComplete: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true})

export default mongoose.models.User || mongoose.model("User", userSchema)
