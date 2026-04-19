import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req: Request) {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return NextResponse.json(
      { error: "إعدادات Cloudinary غير مكتملة" },
      { status: 500 }
    );
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "ملف غير صالح" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "mouaz-blog", resource_type: "image" },
        (error, response) => {
          if (error || !response) {
            reject(error ?? new Error("Cloudinary upload failed"));
            return;
          }
          resolve(response as { secure_url: string; public_id: string });
        }
      );

      stream.end(bytes);
    }
  );

  return NextResponse.json({
    url: result.secure_url,
    publicId: result.public_id
  });
}
