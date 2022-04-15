import axios from "axios";

export const ApiFetcher = async (url, setState) => {
  try {
    const response = await axios.get(url);
    setState(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const ApiPoster = async (url, data, setState) => {
  try {
    const response = await axios({
      method: "post",
      url: url,
      data: data,
    });
    // console.log(response.status)
    setState(response.status);
  } catch (error) {
    console.log(error);
  }
};
