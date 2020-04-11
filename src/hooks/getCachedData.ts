import stickyValue from "./stickyValue";

export default function (
  func: () => any,
  name: string,
  expiredMinutes?: number
) {
  const [data, setData] = stickyValue(null, name);

  async function fetchData() {
    const response = await func();
    setData(response);
  }
  if (!data) {
    fetchData();
  } else if (expiredMinutes) {
    const current: any = new Date();
    const dataTime: any = new Date(data.date);
    const minPassed: any = (current - dataTime) / (60 * 1000);
    if (minPassed > expiredMinutes) {
      fetchData();
    }
  }

  return data;
}
