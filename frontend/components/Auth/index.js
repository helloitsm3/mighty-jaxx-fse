import useLocalStorage from "../../hooks/useLocalStorage";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { isJWTValid } from "../../utils/auth.util";

const Auth = ({ children }) => {
  const router = useRouter();
  const [token, _] = useLocalStorage("user_token");

  useEffect(() => {
    if (!isJWTValid(token)) {
      localStorage.removeItem("user_token");
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
