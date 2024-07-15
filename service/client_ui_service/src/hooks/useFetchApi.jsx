import { useEffect, useState } from "react";
const useFetchApi = (api, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fetch = async () => {
    setLoading("loading...");
    setData(null);
    setError(null);
    const data = await api(params || {});
    if (data) {
      setLoading(false);
      setData(data);
    } else {
      setLoading(false);
      setError("Something went wrong!");
    }
  };

  useEffect(() => {
    fetch();
  }, [params]);

  return { data, loading, error };
};

export default useFetchApi;
