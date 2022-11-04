import Auth from "../components/Auth";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "../hooks/useApp";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Auth>
        <Toaster />
        <Component {...pageProps} />
      </Auth>
    </AppProvider>
  );
}

export default MyApp;
