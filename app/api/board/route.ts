import { NextRequest, NextResponse } from "next/server";
import { CommonResponse } from "@/app/ddd/domain/CommonResponse";
import SqlLiteDB from "@/app/lib/db";

export async function GET(request: NextRequest) {
  try {
    let queryResult = null;
    if (request.nextUrl?.searchParams?.get("idx")) {
      const idx = request.nextUrl.searchParams.get("idx");
      queryResult = SqlLiteDB.prepare("SELECT * FROM board WHERE idx = ?").get([
        idx,
      ]);
    } else {
      queryResult = SqlLiteDB.prepare("SELECT * FROM board").all();
    }

    if (queryResult) {
      return NextResponse.json(
        new CommonResponse({ success: true, data: queryResult })
      );
    } else {
      return NextResponse.json(new CommonResponse({ success: true, data: [] }));
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      new CommonResponse({
        success: false,
        error: "Internal server error",
        details: error.message,
      })
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, contents, username } = await request.json();
    const reg_date = new Date().toISOString();
    SqlLiteDB.prepare(
      "INSERT INTO board (title, contents, username, reg_date) VALUES (?, ?, ?, ?)"
    ).run([title, contents, username, reg_date]);
    return NextResponse.json(
      new CommonResponse({ success: true, data: "Inserted" })
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      new CommonResponse({
        success: false,
        error: "Internal server error",
        details: error.message,
      })
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { idx, title, contents, username } = await request.json();
    SqlLiteDB.prepare(
      "UPDATE board SET title = ?, contents = ?, username = ? WHERE idx = ?"
    ).run([title, contents, username, idx]);
    return NextResponse.json(
      new CommonResponse({ success: true, data: "Updated" })
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      new CommonResponse({
        success: false,
        error: "Internal server error",
        details: error.message,
      })
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { index } = await request.json();
    SqlLiteDB.prepare("DELETE FROM board WHERE index = ?").run([index]);
    return NextResponse.json(
      new CommonResponse({ success: true, data: "Deleted" })
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      new CommonResponse({
        success: false,
        error: "Internal server error",
        details: error.message,
      })
    );
  }
}
