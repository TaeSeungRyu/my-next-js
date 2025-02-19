import SqlLiteDB from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { username } = await req.json();
    const insert = SqlLiteDB.prepare(
      "SELECT username, name FROM User WHERE username = $username"
    );
    const selectResult = insert.run({
      username,
    });
    return NextResponse.json({ result: selectResult }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
