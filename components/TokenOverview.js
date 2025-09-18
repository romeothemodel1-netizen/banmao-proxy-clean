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
        <p>💰 Giá: {data.price ? formatNumber(data.price, 8) : "Chưa có dữ liệu"} USD</p>
        <p>📊 Vốn hóa thị trường: {formatNumber(data.marketCap, 0)} USD</p>
        <p>💎 Giá gốc (FDV): {formatNumber(data.fdv, 0)} USD</p>
        <p>💧 Thanh khoản: {formatNumber(data.totalLiquidity, 0)} USD</p>
        <p>👥 Người sở hữu: {data.holders}</p>
        <p>📈 Thay đổi 24h: {data.priceChange24H} %</p>
        <p>📦 Cung lưu hành: {formatNumber(data.circulatingSupply, 0)}</p>
      </div>
    </div>
  );
}
