import React from "react";
import { render } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppProvider } from "./AppProvider";
import store, { persistor } from "@/app/store/store";
import "@testing-library/jest-dom";

jest.mock("redux-persist/integration/react", () => ({
  PersistGate: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("../components/templates/Layout", () => {
  const MockedLayout = ({ children }: { children: React.ReactNode }) => (
    <div>
      Mocked Layout
      {children}
    </div>
  );
  MockedLayout.displayName = "MockedLayout";
  return MockedLayout;
});

describe("AppProvider Component", () => {
  it("should render children within the app context", () => {
    const { getByText } = render(
      <AppProvider>
        <div>Test Child</div>
      </AppProvider>
    );

    expect(getByText("Mocked Layout")).toBeInTheDocument();

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("should include Redux Provider and ChakraProvider", () => {
    const { getByText } = render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor!}>
          <ChakraProvider>
            <div>Test Integration</div>
          </ChakraProvider>
        </PersistGate>
      </Provider>
    );

    expect(getByText("Test Integration")).toBeInTheDocument();
  });
});
