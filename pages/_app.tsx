import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { CssBaseline } from "@mui/material";
import "../node_modules/katex/dist/katex.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <CssBaseline />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
