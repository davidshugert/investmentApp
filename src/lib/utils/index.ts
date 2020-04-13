import backend from "./backend";

type cacheObj = { [key: string]: { data: number; time: Date } };
interface cacheData {
  crypto: cacheObj;
  stock: cacheObj;
}
const cache: cacheData = {
  crypto: {},
  stock: {},
};
type Symbols = string[];
interface Rates {
  rates: object;
  date: string;
}

export const getCryptoValue = async (identifier: string) => {
  if (cache.crypto[identifier]) {
    let { time, data } = cache.crypto[identifier];
    const current: any = new Date();
    const dataTime: any = time;
    const minPassed: any = (current - dataTime) / (60 * 1000);
    if (minPassed < 5) {
      return data;
    }
  }
  const response = await backend.get(`/iex/crypto/${identifier}`);
  cache.crypto[identifier] = { data: Number(response.data), time: new Date() };
  return Number(response.data);
};

export const getStockValue = async (identifier: string) => {
  if (cache.stock[identifier]) {
    let { time, data } = cache.stock[identifier];
    const current: any = new Date();
    const dataTime: any = time;
    const minPassed: any = (current - dataTime) / (60 * 1000);
    if (minPassed < 5) {
      return data;
    }
  }
  const response = await backend.get(`/iex/stock/${identifier}`);
  cache.stock[identifier] = { data: Number(response.data), time: new Date() };
  return Number(response.data);
};

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
