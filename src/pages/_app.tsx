import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";

import { AppProps } from "next/app";

import { client } from "../services/queryClient";

import { SidebarProvider } from "../contexts/SidebarDrawerContext";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SearchProvider } from "../contexts/SearchContext";
import { ModalProvider } from "../contexts/ModalContext";
import { FavoritesProvider } from "../contexts/FavoritesContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      <ChakraProvider theme={theme}>
        <ModalProvider>
          <FavoritesProvider>
            <SearchProvider>
              <SidebarProvider>
                <Component {...pageProps} />
              </SidebarProvider>
            </SearchProvider>
          </FavoritesProvider>
        </ModalProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
