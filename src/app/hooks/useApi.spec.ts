import { renderHook } from "@testing-library/react-hooks";
import useApi from "./useApi";
import AxiosApiClient from "../api/AxiosApiClient";

jest.mock("../api/AxiosApiClient");

describe("useApi", () => {
  it("should return an instance of AxiosApiClient", () => {
    const mockAxiosApiClient = jest.fn();
    (AxiosApiClient as jest.Mock).mockImplementation(mockAxiosApiClient);

    const { result } = renderHook(() => useApi());

    expect(AxiosApiClient).toHaveBeenCalledTimes(1);
    expect(result.current).toBeInstanceOf(AxiosApiClient);
  });

  it("should memoize the AxiosApiClient instance", () => {
    const { result, rerender } = renderHook(() => useApi());

    rerender();

    expect(result.current).toBeInstanceOf(AxiosApiClient);
  });
});
