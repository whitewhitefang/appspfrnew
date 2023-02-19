import { useState, useCallback } from "react";
export const useFetch = applyData => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (requestConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const request = await fetch(
        requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
      });
      if (!request.ok) {
        throw new Error("There is problem on server side");
      }
      const data = await request.json();
      applyData(data);;
    } catch (err) {
      setError(err || "Something does not working properly");
    }
    setIsLoading(false);
  }, [applyData]);
  return {
    isLoading,
    error,
    sendRequest
  };
};

export default useFetch;