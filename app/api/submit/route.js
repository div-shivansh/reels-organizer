import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { ApifyClient } from 'apify-client';
import connectDB from '@/lib/mongodb';
import Reellinks from '@/models/Reellinks';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(url, folder) {
    try {
        const result = await cloudinary.uploader.upload(url, {
            folder,
            resource_type: "auto",
        })
        return {
            success: true,
            url: result.secure_url,
            public_id: result.public_id,
        }
    } catch (error) {
        console.error("Cloudinary upload error:", error)
        return {success: false, error}
    }
}

export async function POST(request) {
  const { url, userEmail } = await request.json()

  if (!url || !userEmail) {
    return NextResponse.json({ success: false, message: 'Url or Email is missing' }, { status: 400 })
  }

  const reelurl = url.split("/reel/")
  const shortcd = reelurl[1]?.split("/")[0]

  const client = new ApifyClient({
    token: process.env.APIFY_KEY,
  });


  const input = {
    "directUrls": [url],
    "resultsType": "posts",
    "resultsLimit": 1,
    "searchType": "hashtag",
    "searchLimit": 1,
    "addParentData": false
  };

  try {
    await connectDB();

    const existingReel = await Reellinks.findOne({ shortcode: shortcd });

    if (existingReel) {
      if (!existingReel.submittedBy.includes(userEmail)) {
        existingReel.submittedBy.push(userEmail)
        await existingReel.save()
      }
      return NextResponse.json({ success: true, saved: false, data: existingReel }, { status: 200 });
    }

    const run = await client.actor("shu8hvrXbJbY3Eb9W").call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    const reel = items?.[0]

    if (!reel) {
      return NextResponse.json({ success: false, message: 'No reel data found' }, { status: 404 })
    }

    const thumbnailUpload = await uploadToCloudinary(reel.displayUrl, 'reel-thumbnails')
    const videoUpload = await uploadToCloudinary(reel.videoUrl, 'reel-videos')

    if (!thumbnailUpload.success || !videoUpload.success) {
      return NextResponse.json({ success: false, message: "Failed to upload media"}, {status: 500})
    }

    const newReel = await Reellinks.create({
      inputUrl: reel.inputUrl,
      reelId: reel.id,
      shortcode: reel.shortCode,

      caption: reel.caption,
      hashtags: reel.hashtags,
      thumbnail: thumbnailUpload.url,
      videoUrl: videoUpload.url,
      duration: reel.videoDuration,
      likesCount: reel.likesCount,
      commentsCount: reel.commentsCount,

      owner: {
        username: reel.ownerUsername,
        fullName: reel.ownerFullName,
        id: reel.ownerId
      },

      timestamp: new Date(reel.timestamp),
      scrapedAt: new Date(),
      submittedBy: [userEmail]
    });

    return NextResponse.json({ success: true, saved: true, data: newReel }, { status: 200 });
  } catch (error) {
    console.error('Apify or DB error:', error.message);
    return NextResponse.json({ success: false, message: 'Scraping or DB failed' }, { status: 500 });
  }
}
