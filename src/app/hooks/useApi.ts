import { useMemo } from "react";
import { ApiClient } from "../api/ApiClient";
import AxiosApiClient from "../api/AxiosApiClient";
// import { useToast } from "./useToast";

const useApi = (): ApiClient => {
  const client = useMemo(() => {
    return new AxiosApiClient();
  }, []);

  return client;
};

export default useApi;
