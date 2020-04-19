import stickyValue from "./stickyValue";
import { snackbarService } from "uno-material-ui";

export default function (
  func: () => any,
  name: string,
  expiredMinutes?: number
) {
  const [data, setData] = stickyValue(null, name);

  async function fetchData() {
    try {
      const response = await func();
      setData(response);
    } catch (error) {
      snackbarService.showSnackbar("Error while fetching data", "error");
    }
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
