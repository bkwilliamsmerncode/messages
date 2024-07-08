import { useEffect } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme"; // Adjust the import if your theme file is in a different directory

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    fetch('/api/socket');
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;