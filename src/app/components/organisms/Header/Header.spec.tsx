import { render, screen } from "@testing-library/react";
import Header from ".";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/app/hooks/useAuthService", () => {
  const mockLogoutUser = jest.fn();
  return {
    useAuthService: jest.fn(() => ({
      logoutUser: mockLogoutUser,
    })),
  };
});

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: jest.fn(() => jest.fn()),
}));

const mockUseSelector = useSelector as unknown as jest.Mock;

mockUseSelector.mockImplementation((selector: (state: RootState) => unknown) =>
  selector({
    auth: {
      isAuthenticated: true,
      user: {
        username: "John Doe",
        email: "HtJ6V@example.com",
        id: "1",
        active: true,
        accessToken: "token",
        balance: 100,
      },
      balance: 100,
      accessToken: "token",
      _persist: {
        rehydrated: true,
        version: 1,
      },
    },
    records: {
      records: [],
      totalPages: 1,
      isFirst: true,
      isLast: true,
    },
    operations: {
      operations: [
        {
          id: "1",
          type: "ADDITION",
          cost: 5,
        },
        {
          id: "2",
          type: "SUBTRACTION",
          cost: 3,
        },
      ],
    },
  })
);

describe("Header", () => {
  it("should render the header properly", () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    render(<Header />);
    const heading = screen.getByText(/Arithmetic Calculator/i);
    expect(heading).toBeInTheDocument();
  });

  it("should render the authenticated user's username", () => {
    render(<Header />);
    const username = screen.getByText(/John Doe/i);
    expect(username).toBeInTheDocument();
  });

  it("should render the logout button when the user is authenticated", () => {
    render(<Header />);
    const logoutButton = screen.getByRole("button", { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });

  it("should render the HeaderContent component with the correct appName", () => {
    render(<Header />);
    const appName = screen.getByText(/Arithmetic Calculator/i);
    expect(appName).toBeInTheDocument();
  });

  it("should have accessible roles for header elements", () => {
    render(<Header />);
    const header = screen.getByRole("banner");

    expect(header).toBeInTheDocument();
  });
});
