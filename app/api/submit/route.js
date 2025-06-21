import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ApifyClient } from 'apify-client';

export async function POST(request) {
  const { url } = await request.json()

  if (!url) {
    return NextResponse.json({ success: false, message: 'No url provided' }, { status: 400 })
  }

  // Initialize the ApifyClient with API token
  const client = new ApifyClient({
    token: process.env.APIFY_KEY,
  });

  // Prepare Actor input
  const input = {
    "directUrls": [url],
    "resultsType": "posts",
    "resultsLimit": 1,
    "searchType": "hashtag",
    "searchLimit": 1,
    "addParentData": false
  };

  try {
    const run = await client.actor("shu8hvrXbJbY3Eb9W").call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    const reel = items?.[0]

    if (!reel) {
      return NextResponse.json({ success: false, message: 'No reel data found' }, { status: 404 })
    }

    const mongodb = await clientPromise
    const db = mongodb.db("reelOrganizer")
    const collection = db.collection("userlinks")

    const doc = { 
      inputUrl: reel.inputUrl,
      reelId: reel.id,
      shortcode: reel.shortCode,

      caption: reel.caption,
      hashtags: reel.hashtags,
      thumbnail: reel.displayUrl,
      videoUrl: reel.videoUrl,
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
    };

    await collection.insertOne(doc);

    return NextResponse.json({ success: true, saved: true, data: doc }, { status: 200 });
  } catch (error) {
    console.error('Apify or DB error:', error.message);
    return NextResponse.json({ success: false, message: 'Scraping or DB failed' }, { status: 500 });
  }
}
