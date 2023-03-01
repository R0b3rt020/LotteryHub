import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";
import { PulsechainTestnetV2b } from "@thirdweb-dev/chains";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
  activeChain={PulsechainTestnetV2b}
>
  <Component {...pageProps} />
  <Toaster />
  </ThirdwebProvider>
  )
}

export default MyApp
