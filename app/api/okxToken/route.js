// app/api/okxToken/route.js
import { NextResponse } from "next/server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function GET() {
  try {
    const url =
      "https://web3.okx.com/priapi/v1/dx/market/v2/token/overview?chainId=196&tokenContractAddress=0x16d91d1615fc55b76d5f92365bd60c069b46ef78";

    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Không lấy được dữ liệu từ OKX API");

    const raw = await res.json();
    const info = raw?.data?.marketInfo || {};

    let price = 0;
    if (info.marketCap && info.circulatingSupply) {
      const cap = parseFloat(info.marketCap);
      const supply = parseFloat(info.circulatingSupply);
      if (cap > 0 && supply > 0) price = cap / supply;
    }

    return NextResponse.json(
      {
        price,
        marketCap: info.marketCap || 0,
        fdv: info.fdv || 0,
        totalLiquidity: info.totalLiquidity || 0,
        holders: info.holders || 0,
        priceChange24H: info.priceChange24H || 0,
        circulatingSupply: info.circulatingSupply || 0,
        symbol: raw?.data?.symbol || "",
        name: raw?.data?.name || "",
        logo: raw?.data?.logo || "",
      },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("Lỗi API:", error);
    return NextResponse.json(
      { error: "Không lấy được dữ liệu" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
