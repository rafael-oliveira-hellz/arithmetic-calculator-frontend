import { render } from "@testing-library/react";
import RootLayout from "./layout";

jest.mock("./providers/AppProvider", () => ({
  AppProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-provider">{children}</div>
  ),
}));

describe("RootLayout", () => {
  it("deve renderizar os filhos dentro do AppProvider", () => {
    const { getByTestId, getByText } = render(
      <RootLayout withHtmlAndBody={false}>
        <div>Test Child</div>
      </RootLayout>
    );

    expect(getByTestId("app-provider")).toBeInTheDocument();

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("deve definir as variáveis de fonte corretas no body", () => {
    const { container } = render(
      <RootLayout withHtmlAndBody={false}>
        <div>Test Child</div>
      </RootLayout>
    );

    const bodyElement = container.querySelector("div");

    expect(bodyElement).toHaveClass("antialiased");

    const computedStyle = getComputedStyle(bodyElement as Element);
    expect(computedStyle.getPropertyValue("--font-geist-sans")).toBeDefined();
    expect(computedStyle.getPropertyValue("--font-geist-mono")).toBeDefined();
  });
});
