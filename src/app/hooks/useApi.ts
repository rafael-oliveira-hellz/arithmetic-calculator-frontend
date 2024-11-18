import { useMemo } from "react";
import { ApiClient } from "../api/ApiClient";
import AxiosApiClient from "../api/AxiosApiClient";
// import { useToast } from "./useToast";

const useApi = (): ApiClient => {
  // const { showToast } = useToast();

  const client = useMemo(
    () => {
      return new AxiosApiClient();
      // showToast
    },
    [
      // showToast
    ]
  );

  return client;
};

export default useApi;
