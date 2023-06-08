import { fetcher } from "./fetcher";

export const getFromApi = async (url: string) => {
    try {
      const data = await fetcher(url);
      return data;
    } catch (error) {
      return null;
    }
  };