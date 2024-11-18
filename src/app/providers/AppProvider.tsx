import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import store from "@/app/store/store";
import { Provider } from "react-redux";
import Layout from "../components/templates/Layout";
import { ToastProvider } from "./ToastProvider";

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Provider store={store}>
      <ChakraProvider theme={extendTheme({})}>
        <ToastProvider>
          <Layout>{children}</Layout>
        </ToastProvider>
      </ChakraProvider>
    </Provider>
  );
}
