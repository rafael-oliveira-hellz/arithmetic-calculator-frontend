import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ApiClient, ApiRequestConfig } from "./ApiClient";
// import { Toast } from "../context/toast-context";

class AxiosApiClient implements ApiClient {
  private client = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  constructor() {
    this.client.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
          config.headers.accessToken = `${token}`;
          console.log("AccessToken header added:", token);
        } else {
          console.log("No AccessToken found in sessionStorage.");
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        this.showErrorMessage(error);
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: ApiRequestConfig): Promise<T> {
    return (await this.client.get<T>(url, this.transformConfig(config))).data;
  }
  async post<T>(
    url: string,
    data: unknown,
    config?: ApiRequestConfig
  ): Promise<T> {
    return (await this.client.post<T>(url, data, this.transformConfig(config)))
      .data;
  }
  async put<T>(
    url: string,
    data: unknown,
    config?: ApiRequestConfig
  ): Promise<T> {
    return (await this.client.put<T>(url, data, this.transformConfig(config)))
      .data;
  }
  async patch<T>(
    url: string,
    data: unknown,
    config?: ApiRequestConfig
  ): Promise<T> {
    return (await this.client.patch<T>(url, data, this.transformConfig(config)))
      .data;
  }
  async delete(url: string, config?: ApiRequestConfig): Promise<void> {
    await this.client.delete(url, this.transformConfig(config));
  }

  private showErrorMessage(error: AxiosError) {
    // this.showToast({
    //   title: "Erro",
    //   description: error.message || "Erro inesperado",
    //   status: "error",
    // });
    console.log(JSON.stringify(error, null, 2));
  }

  private transformConfig(config?: ApiRequestConfig): AxiosRequestConfig {
    return {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "application/json",
      },
    };
  }
}

export default AxiosApiClient;
