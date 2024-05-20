import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fid = searchParams.get("fid");

  if (!fid) {
    return new Response(JSON.stringify({ error: "Missing fid parameter" }), {
      status: 400,
    });
  }

  try {
    const response = await fetch(
      `https://www.degen.tips/api/airdrop2/tip-allowance?fid=${fid}`
    );
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch allowance data" }),
      { status: 500 }
    );
  }
}
