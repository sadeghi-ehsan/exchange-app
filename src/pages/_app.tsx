import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Templates/layout";
import { store } from "@/store";
import { Provider as ReduxProvider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReduxProvider>
  );
}
