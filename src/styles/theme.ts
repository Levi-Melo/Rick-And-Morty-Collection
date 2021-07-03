import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#181b23",
      "800": "#1f2029",
      "700": "#353646",
      "600": "#4b4d63",
      "500": "#616480",
      "400": "#797d9a",
      "300": "#9699b0",
      "200": "#b3b5c6",
      "100": "#d1d2dc",
      "50": "#eeeef2",
    },
    green: {
      "200": "#ccd46c",
      "300": "#a1d45f",
      "400": "#95bc4a",
      "500": "#4b9940",
      "600": "#127f3e",
      "700": "#276749",
      "800": "#22543D",
    },
    blue: {
      "500": "#34afbd",
      "700": "#2f8a88",
    },
  },
  font: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.50",
      },
    },
  },
});
