import { useState, useEffect } from "react";
function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abort = new AbortController()
    fetch(url,{signal:abort.signal})
      .then((res) => {
        if (!res.ok) {
          throw new Error("couldn't fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setisLoading(false);
        setError(null);
      })
      .catch((e) => {
        if (e.name === "AbortError") {
          console.log(e);
        } else {
          setData(null);
          setisLoading(false);
          setError(e.message);
        }
      });

    return () => {
      abort.abort()
    };
  }, [url]);
  return { data, isLoading, error };
}
export default useFetch;
