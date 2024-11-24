import axios from "axios";
import { useEffect, useState } from "react";
import { Headers, QueryState } from "../interfaces";

const useQuery = <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  headers?: Headers,
  data?: any
) => {
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    isLoading: true,
    error: "",
  });

  const fetch = async () => {
    try {
      const res = await axios({
        url,
        method,
        data,
        headers,
      });

      const responseData = res.data;

      setState({ data: responseData, isLoading: false, error: "" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setState({ data: null, isLoading: false, error: err.message });
      } else {
        setState({
          data: null,
          isLoading: false,
          error: "An unknown error occurred",
        });
      }
    }
  };

  useEffect(() => {
    fetch();
  }, [url, method, data]);

  return { ...state, refetch: fetch };
};

export default useQuery;
