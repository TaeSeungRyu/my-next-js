import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/gif"],
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log("blob upload completed", blob, tokenPayload);
        try {
        } catch (error) {
          throw new Error("Could not update user");
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 } // The webhook will retry 5 times waiting for a 200
    );
  }
}

const videoUrl =
  "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4";

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(videoUrl);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch the video",
        },
        { status: response.status }
      );
    }

    const videoStream = response.body;

    return new NextResponse(videoStream, {
      headers: {
        "Content-Type": "video/mp4",
        "Cache-Control": "public, max-age=3600, s-maxage=86400, immutable", // 캐싱 설정
      },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
