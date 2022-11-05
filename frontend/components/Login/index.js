import Link from "next/link";
import toast from "react-hot-toast";
import api from "../../utils/api.util";
import useLocalStorage from "../../hooks/useLocalStorage";

import { useRouter } from "next/router";
import { useApp } from "../../hooks/useApp";

const Login = () => {
  const router = useRouter();
  const { setAppState, appState } = useApp();
  const [_, setToken] = useLocalStorage("user_token");

  const handleLogin = (e) => {
    e.preventDefault();

    setAppState((prev) => ({ ...prev, isLoading: true }));
    api.user
      .login(e.target.email.value, e.target.password.value)
      .then(function (response) {
        setAppState((prev) => ({ ...prev, isLoading: false }));
        setToken(response.data.token);
        router.push("/");
      })
      .catch(function () {
        setAppState((prev) => ({ ...prev, isLoading: false }));
        toast.error("Failed to login. Invalid credentials");
      });
  };

  return (
    <div className="bg-light-yellow px-10 py-5 rounded-md text-black space-y-5 2xl:w-1/5">
      <p className="font-bold text-2xl">Login to Dashboard</p>

      <form className="flex flex-col space-y-8" onSubmit={handleLogin}>
        <div className="space-y-3">
          <div className="flex justify-between w-full space-x-14 items-center">
            <label htmlFor="email">Email</label>
            <input
              className="py-1 px-3 rounded-md text-white bg-black"
              type="email"
              placeholder="Enter email"
              name="email"
              required
            />
          </div>

          <div className="flex justify-between w-full items-center">
            <label htmlFor="password">Password</label>
            <input
              className="py-1 px-3 rounded-md text-white bg-black"
              type="password"
              placeholder="Enter Password"
              name="password"
              required
            />
          </div>
        </div>

        <div className="w-full flex flex-col">
          <button
            type="submit"
            disabled={appState.isLoading}
            className={`${
              appState.isLoading ? "bg-gray-500" : "bg-blue-500"
            } rounded-md py-3 text-white w-full`}
          >
            {appState.isLoading ? "Loading..." : "Login"}
          </button>

          <Link href="/register">
            <p className="mt-5">Click here to register an account</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
