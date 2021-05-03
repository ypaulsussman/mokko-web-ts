import { useState, useEffect } from "react";

export const getData = (url: string, init: object) => fetch(url, init)
  .then(resp => {
    if (!resp.ok) {
      throw Error(`Code ${resp.status} (${resp.statusText})`);
    }
    return resp.json();
  });

export const useFetch = (url: string, init: object) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let performUpdate = true;

    setStatus("loading");
    setData(undefined);
    setError(null);

    getData(url, init)
      .then(successResponse => {
        if (performUpdate) {
          setData(successResponse);
          setStatus("success");
        }
      })
      .catch(errorResponse => {
        if (performUpdate) {
          setError(errorResponse);
          setStatus("error");
        }
      });
    return () => { performUpdate = false; };
  }, [url, init]);

  return { data, status, error };
};
