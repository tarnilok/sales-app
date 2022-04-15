//libraries
import axios from "axios";

export const ApiFetcher = async (url, setState) => {
  try {
    const response = await axios.get(url);
    setState(response.data);
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
