const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
admin.initializeApp(functions.config().firebase);

const iexCloud = axios.create({
  baseURL: "https://cloud.iexapis.com/stable/",
});
const iexCryptoSymbols = [
  { symbol: "BTCUSD", name: "Bitcoin to USD" },
  { symbol: "ETHUSD", name: "Ethereum toUSD" },
  { symbol: "ZECUSD", name: "Zcash to USD" },
  { symbol: "BCHUSD", name: "Bitcoin Cash toUSD" },
  { symbol: "LTCUSD", name: "Litecoin to USD" },
];
const iexCloudToken = `?token=${functions.config().iex.token}`;

const convertToCurrency = async (symbol, base = "USD") => {
  symbol = symbol.toUpperCase();
  base = base.toUpperCase();
  if (!currencySymbols.includes(symbol)) throw new Error("Symbol not accepted");
  if (symbol === base) return 1;
  const response = await axios.get(
    `https://api.exchangeratesapi.io/latest?base=${base}`
  );
  const rate = response.data.rates[symbol];
  return rate;
};

const app = express();
const main = express();

main.use(cors());
main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

app.get("/hello", (req, res) => {
  res.send("hello");
});
app.get("/world", (req, res) => {
  res.send("world");
});
//Used in Prod
app.get("/iex/stock/:symbol", async (req, res) => {
  try {
    let symbol = req.params.symbol;
    const currency = req.query.currency;
    if (!symbol) throw new Error("No symbols entered");
    symbol = symbol.toUpperCase();
    const response = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote${iexCloudToken}`
    );
    if (response.data.length === 0) {
      throw Error("No Stock availble");
    }
    console.log(typeof response.data);
    let price = response.data.latestPrice;
    if (currency && currency !== "USD") {
      price = price * (await convertToCurrency(currency));
    }
    res.status(200).send(`${price}`);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);

    return;
  }
});
//Used in Prod
app.get("/iex/crypto/cryptoSymbols", async (req, res) => {
  try {
    const response = await axios.get(
      `https://cloud.iexapis.com/stable/ref-data/crypto/symbols${iexCloudToken}`
    );
    if (response.data.length === 0) {
      throw Error("No CryptoCurrencies available");
    }
    const data = response.data
      .filter(
        (curr) =>
          curr.isEnabled && curr.region === "US" && curr.currency === "USD"
      )
      .map((currency) => ({
        symbol: currency.symbol,
        name: currency.name,
      }));
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
});
//Used in Prod
app.get("/iex/crypto/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const currency = req.query.currency;

    let search = iexCryptoSymbols.find((crypto) =>
      crypto.symbol.includes(symbol)
    );
    if (!search) throw Error("Unable to find Symbol");
    const response = await axios.get(
      `https://cloud.iexapis.com/stable/crypto/${search.symbol}/price${iexCloudToken}`
    );
    if (response.data.length === 0) {
      throw Error("No data available");
    }
    let price = response.data.price;
    if (currency && currency !== "USD") {
      price = price * (await convertToCurrency(currency));
    }
    res.send(`${price}`);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
});
//Used in Prod
app.get("/currency/rates", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.exchangeratesapi.io/latest?base=USD`
    );
    res.send({ rates: response.data.rates, date: new Date().toString() });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);

    return;
  }
});

//define google cloud function name
exports.webApi = functions.https.onRequest(main);
