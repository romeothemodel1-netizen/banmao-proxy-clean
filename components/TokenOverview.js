"use client";
import { useEffect, useState } from "react";

// ✅ Hàm format số có dấu phẩy
function formatNumber(num, digits = 2) {
  if (!num) return 0;
  return Number(num).toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function TokenOverview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/okxToken")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p>⏳ Đang tải...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📊 Bảng điều khiển Banmao</h1>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "400px",
          background: "#fafafa",
        }}
      >
        <p>💰 price: {data.price ? formatNumber(data.price, 8) : "Chưa có dữ liệu"} USD</p>
        <p>📊 marketcap: {formatNumber(data.marketCap, 0)} USD</p>
        <p>💎 fdv (FDV): {formatNumber(data.fdv, 0)} USD</p>
        <p>💧 liquidity: {formatNumber(data.totalLiquidity, 0)} USD</p>
        <p>👥 holders: {data.holders}</p>
        <p>📈 priceChange24h: {data.priceChange24H} %</p>
        <p>📦 circulatingSupply: {formatNumber(data.circulatingSupply, 0)}</p>
      </div>
    </div>
  );
}
