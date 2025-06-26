import mongoose from "mongoose";

const ReellinksSchema = new mongoose.Schema({
    inputUrl: String,
    reelId: {type: String, required: true, unique: true},
    shortcode: String,
    caption: String,
    hashtags: [String],
    thumbnail: String,
    videoUrl: String,
    duration: Number,
    likesCount: Number, 
    commentsCount: Number,
    owner: {
        username: String,
        fullName: String,
        id: String
    },
    timestamp: Date,
    scrapedAt: Date,
    submittedBy: [String]
})

export default mongoose.models.Reellinks || mongoose.model("Reellinks", ReellinksSchema);