import Auth from "../components/Auth";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Auth>
      <Toaster />
      <Component {...pageProps} />
    </Auth>
  );
}

export default MyApp;
