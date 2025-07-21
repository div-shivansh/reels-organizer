import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ success: false, message: "No file found" }, { status: 400 });
    }

    // More flexible image validation
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const isValidImage = file.type && validImageTypes.includes(file.type.toLowerCase());
    
    if (!isValidImage) {
      return NextResponse.json({ 
        success: false, 
        message: `File must be an image. Received: ${file.type}` 
      }, { status: 400 });
    }

    // Handle file data - try multiple methods
    let buffer;
    
    if (typeof file.arrayBuffer === 'function') {
      // Method 1: arrayBuffer (newer Next.js)
      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
    } else if (file.stream) {
      // Method 2: Read from stream
      const stream = file.stream();
      const reader = stream.getReader();
      const chunks = [];
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
      
      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const combined = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        combined.set(chunk, offset);
        offset += chunk.length;
      }
      buffer = Buffer.from(combined);
    } else {
      // Method 3: Direct buffer conversion (fallback)
      buffer = Buffer.from(file);
    }

    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload directly to Cloudinary (no local storage)
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "next-cloudinary-uploads",
      resource_type: "image"
    });

    return NextResponse.json({ 
      success: true, 
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    }, { status: 200 });

  } catch (error) {
    console.error("Upload image failed", error);
    return NextResponse.json({ 
      success: false, 
      message: "Upload failed" 
    }, { status: 500 });
  }
}