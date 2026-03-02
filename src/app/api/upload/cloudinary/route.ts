import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";

const normalize = (value: string | undefined) => {
  if (!value) return value;
  const trimmed = value.trim();
  let decoded = trimmed;
  try {
    decoded = decodeURIComponent(trimmed);
  } catch {
    // Keep original when value is not URI-encoded.
  }
  return decoded.replace(/^<|>$/g, "");
};

function resolveCloudinaryConfig() {
  const cloudName = normalize(process.env.CLOUDINARY_CLOUD_NAME);
  const apiKey = normalize(process.env.CLOUDINARY_API_KEY);
  const apiSecret = normalize(process.env.CLOUDINARY_API_SECRET);

  if (cloudName && apiKey && apiSecret) {
    return { cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret };
  }

  const cloudinaryUrl = normalize(process.env.CLOUDINARY_URL);
  if (!cloudinaryUrl) return null;

  try {
    const parsed = new URL(cloudinaryUrl);
    return {
      cloud_name: normalize(parsed.hostname),
      api_key: normalize(parsed.username),
      api_secret: normalize(parsed.password),
    };
  } catch {
    return null;
  }
}

const config = resolveCloudinaryConfig();
if (config) {
  cloudinary.config(config);
}

type CloudinaryUploadError = {
  error?: { message?: string; http_code?: number; name?: string };
  message?: string;
  name?: string;
  http_code?: number;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isTimeoutLikeError = (err: unknown) => {
  const e = err as CloudinaryUploadError;
  const name = e?.error?.name ?? e?.name ?? "";
  const message = e?.error?.message ?? e?.message ?? "";
  const code = e?.error?.http_code ?? e?.http_code;
  return (
    name.toLowerCase().includes("timeout") ||
    message.toLowerCase().includes("timeout") ||
    code === 499
  );
};

function uploadBufferToCloudinary(buf: Buffer) {
  return new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "profile",
        resource_type: "image",
        timeout: 120000,
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }
        resolve({ secure_url: result.secure_url });
      }
    );

    stream.end(buf);
  });
}

async function uploadWithRetry(buf: Buffer) {
  try {
    return await uploadBufferToCloudinary(buf);
  } catch (err) {
    if (!isTimeoutLikeError(err)) throw err;
    await sleep(800);
    return uploadBufferToCloudinary(buf);
  }
}

export async function POST(req: Request) {
  try {
    if (!config?.cloud_name || !config.api_key || !config.api_secret) {
      return NextResponse.json(
        {
          error:
            "Cloudinary configuration is missing. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME/CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET.",
        },
        { status: 500 }
      );
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file || !file.size) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const result = await uploadWithRetry(buf);

    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    console.error("[upload/cloudinary]", err);

    if (isTimeoutLikeError(err)) {
      return NextResponse.json(
        {
          error:
            "Cloudinary timed out while uploading. Please retry once more.",
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    );
  }
}
