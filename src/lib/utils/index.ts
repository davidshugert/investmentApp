import backend from "./backend";

export const getCryptoValue = async (identifier: string) => {
  const response = await backend.get(`/iex/crypto/${identifier}`);
  return Number(response.data);
};

export const getStockValue = async (identifier: string) => {
  const response = await backend.get(`/iex/stock/${identifier}`);
  return Number(response.data);
};
type Symbols = string[];
interface Rates {
  rates: object;
  date: string;
}
export const getCurrencySymbols = async () => {
  const response = await backend.get<Symbols>(`/currency/symbols`);
  return response.data;
};
export const getCurrencyRates = async () => {
  const response = await backend.get<Rates>(`/currency/rates`);
  return response.data;
};
export const getCryptoSymbols = async () => {
  const response = await backend.get<{ symbol: string; name: string }[]>(
    `/iex/crypto/cryptoSymbols`
  );
  return response.data;
};
