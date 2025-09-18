// api/cmc.js
export default async function handler(req, res) {
  const { contract, convert = "USD" } = req.query;
  if (!contract) {
    return res.status(400).json({ error: "Missing contract" });
  }

  const API_KEY = process.env.CMC_API_KEY;
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?convert=${convert}&address=${contract}`;

  try {
    const r = await fetch(url, {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY,
        "Accept": "application/json",
      },
    });
    const data = await r.json();

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
