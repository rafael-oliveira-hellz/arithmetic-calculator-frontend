export interface ApiRequestConfig {
  headers?: Record<string, string>;
}

export interface ApiClient {
  get<T>(url: string, config?: ApiRequestConfig): Promise<T>;
  post<T>(url: string, config?: ApiRequestConfig): Promise<T>;
  post<T>(url: string, data: unknown, config?: ApiRequestConfig): Promise<T>;
  put<T>(url: string, data: unknown, config?: ApiRequestConfig): Promise<T>;
  patch<T>(url: string, data: unknown, config?: ApiRequestConfig): Promise<T>;
  delete(url: string, config?: ApiRequestConfig): Promise<void>;
}
