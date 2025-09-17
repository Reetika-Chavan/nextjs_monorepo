import { NextResponse } from "next/server";
import { Stack } from "../../../lib/contentstack";

export async function GET() {
  try {
    const Query = Stack.ContentType("drivers").Query();
    const [entries] = await Query.toJSON().find();
    const driver = entries?.[0] || null;

    const response = NextResponse.json({
      driver,
      timestamp: new Date().toISOString(),
    });

    // 👇 Required for Launch cache purge
    response.headers.set("Cache-Tag", "formula");
    response.headers.set("Cache-Control", "public, max-age=0, s-maxage=40");

    return response;
  } catch (error) {
    console.error("test fetch error:", error);
    return NextResponse.json({ error: "Failed to load driver" }, { status: 500 });
  }
}
