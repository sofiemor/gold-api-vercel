import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch("https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD");

    if (!response.ok) {
      throw new Error(`Swissquote API error: ${response.status}`);
    }

    const data = await response.json();
    const bid = data[0].spreadProfilePrices[0].bid;
    const gramsPerOunce = 31.104;
    const pricePerGram = parseFloat((bid / gramsPerOunce).toFixed(2));

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ price: pricePerGram });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch gold price" });
  }
}
