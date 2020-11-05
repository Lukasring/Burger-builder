import { useState, useEffect } from "react";

export default (httpClient) => {
  const [error, setError] = useState();

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
      return;
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.response.eject(resInterceptor);
      httpClient.interceptors.request.eject(reqInterceptor);
    };
  }, [resInterceptor, reqInterceptor, httpClient]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
