import { CommonResponse } from "@/app/ddd/domain/CommonResponse";
import SqlLiteDB from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const username = req.nextUrl.searchParams.get("username");
    const select = SqlLiteDB.prepare(
      "SELECT username, name FROM User WHERE username = ?"
    );
    const selectResult: any = select.get(username);
    return NextResponse.json(
      new CommonResponse({ data: selectResult, status: 200 })
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      new CommonResponse({
        error: "Internal server error",
        details: error.message,
      })
    );
  }
}
