import * as React from "react";
import Head from "next/head";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/style.css";

const customTheme = extendTheme({
  colors: {
    btncom: {
      100: "#304FFF",
      200: "#302FFF",
    },
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semi: 600,
    bold: 700,
    xbold: 800,
    black: 900,
  },
});

function App({ Component, pageProps }) {
  console.log("Hello from APP");
  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <title>Bmail</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
