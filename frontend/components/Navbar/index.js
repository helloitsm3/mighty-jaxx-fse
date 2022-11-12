import { useEffect } from "react";
import { useRouter } from "next/router";
import { useApp } from "../../hooks/useApp";
import { decodeJWT } from "../../utils/auth.util";
import useLocalStorage from "../../hooks/useLocalStorage";

const Navbar = ({ children }) => {
  const router = useRouter();
  const { appState, setAppState } = useApp();
  const [token, _] = useLocalStorage("user_token");

  useEffect(() => {
    if (token) {
      setAppState((prev) => ({ ...prev, user: decodeJWT(token) }));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    router.push("/login");
  };

  return (
    <div className="bg-gradient-texture min-h-screen">
      <nav className="px-5 py-3 flex justify-between items-center">
        <span className="text-xl font-bold text-dark-brown">
          Mighty Jaxx Dashboard
        </span>

        <div className="flex flex-row items-center md:space-x-5">
          <p className="text-dark-brown md:flex hidden">
            {appState?.user?.email} ({appState?.user?.role})
          </p>

          <button
            className="bg-red-500 px-3 py-1 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="flex justify-center items-center py-10 flex-col">
        {children}
      </main>
    </div>
  );
};

export default Navbar;
