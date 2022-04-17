//libraries
import axios from "axios";

export const ApiFetcher = async (url, setState, setProductsHolder, setLoading) => {
  try {
    const response = await axios.get(url);
    setState(response?.data);
    setProductsHolder(response?.data);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export const ApiHandler = async (url, data, method) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
