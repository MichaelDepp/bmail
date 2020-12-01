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
  const [loggedIn, setLoggedIn] = React.useState(false);
  console.log("Hello from APP");

  // const callApi = () => {
  //   fetch("http://localhost:8000/testAPI")
  //     .then((res) => res.text())
  //     .then((res) => setApi(res));
  // };

  // React.useEffect(() => {
  //   callApi();
  // });

  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <title>Zapp</title>
      </Head>
      <Component {...pageProps} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    </ChakraProvider>
  );
}

export default App;
