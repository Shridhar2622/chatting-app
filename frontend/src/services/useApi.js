import axios from "axios";
import { useState } from "react"
const api = axios.create({
  baseURL: "http://localhost:3000/chat/api",
  withCredentials: true   // THIS enables cookies
});

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async (url, data) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.post(url, data);
      return res.data;

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      throw err;

    } finally {
      setLoading(false);
    }
  };

  const get = async (url, config = {}) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(url, config);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { post, get, loading, error };

}
