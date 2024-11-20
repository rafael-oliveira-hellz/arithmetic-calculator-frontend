import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import store, { persistor } from "@/app/store/store";
import { Provider } from "react-redux";
import Layout from "../components/templates/Layout";
import { PersistGate } from "redux-persist/integration/react";

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor!}>
        <ChakraProvider theme={extendTheme({})}>
          <Layout>{children}</Layout>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}
