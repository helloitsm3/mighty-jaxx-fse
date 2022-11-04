import useLocalStorage from "../../hooks/useLocalStorage";

import { useEffect } from "react";
import { useRouter } from "next/router";

const Auth = ({ children }) => {
  const router = useRouter();
  const [token, _] = useLocalStorage("user_token");

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      if (router.pathname === "/login") {
        router.push("/");
      }
    }
  }, [token]);

  return <>{children}</>;
};

export default Auth;
