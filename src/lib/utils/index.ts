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
export const getUserData = async () => {
  console.log("getting user Data");
  return;
};
export const saveUserDate = async (user: object) => {
  console.log("saving user Data");
  console.log(user);
  const response = await backend.get<{ symbol: string; name: string }[]>(
    `/user/save`
  );
  return response.data;
};
