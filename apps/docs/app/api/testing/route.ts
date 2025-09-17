// apps/docs/app/api/testing/route.ts
import { NextResponse } from "next/server";
import { Stack } from "../../../lib/contentstack";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export async function GET() {
  try {
    const Query = Stack.ContentType("drivers").Query();
    const [entries] = await Query.toJSON().find();
    const driver = entries?.[0] || null;

    const res = NextResponse.json({
      driver,
      timestamp: new Date().toISOString(),
    });

    // ✅ Add cache headers + tags
    res.headers.set("Cache-Tag", "drivers");
    res.headers.set("Cache-Control", "public, max-age=0, s-maxage=60");

    return res;
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch driver" }, { status: 500 });
  }
}
