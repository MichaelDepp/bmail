import * as React from "react";
import Head from "next/head";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "regenerator-runtime/runtime";
import localStorage from "localStorage";
import moment from "moment";
import "../styles/style.css";

const localkey = JSON.parse(localStorage.getItem("zapp_login"));

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
  const [loggedIn, setLoggedIn] = React.useState(
    localkey === null ? false : true
  );
  const [currentUser, setCurrentUser] = React.useState(
    localkey && localkey.user
  );
  const [talk, setTalk] = React.useState(false);

  console.log("Hello from APP");
  console.log("====curentttt====", loggedIn);
  const api_key = process.env.NEXT_PUBLIC_ZAPP_API;
  console.log("curent API==================>", api_key);

  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <title>Zapp</title>
        <link rel="shortcut icon" href="./ico/icon-192x192.png" />
        <link rel="apple-touch-icon" href="./ico/icon-384x384.png" />
        <meta name="theme-color" content="#F8F8F8" />
        <link rel="manifest" href="./manifest.json" />
      </Head>
      <Component
        {...pageProps}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        api_key={api_key}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setTalk={setTalk}
        talk={talk}
      />
    </ChakraProvider>
  );
}

export default App;
