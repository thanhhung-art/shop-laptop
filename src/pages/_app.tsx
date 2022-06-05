import type { AppProps } from "next/app";
import "../../styles/globals.css";
import { store } from "../app/store";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../app/store";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Navbar from "../components/navbar/Navbar";
import DisplayToast from "../components/DisplayToast";
import { CssBaseline } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CssBaseline />
            <Navbar />
            <DisplayToast />
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </PersistGate>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
