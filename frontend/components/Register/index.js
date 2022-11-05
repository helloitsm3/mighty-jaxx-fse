import Link from "next/link";
import toast from "react-hot-toast";
import api from "../../utils/api.util";

import { useRouter } from "next/router";
import { useApp } from "../../hooks/useApp";

const Register = () => {
  const router = useRouter();
  const { setAppState, appState } = useApp();

  const handleLogin = (e) => {
    e.preventDefault();

    setAppState((prev) => ({ ...prev, isLoading: true }));
    api.user
      .register(e.target.email.value, e.target.password.value)
      .then(() => {
        setAppState((prev) => ({ ...prev, isLoading: false }));
        toast.success("Successfully registered an account");
        router.push("/login");
      })
      .catch(function (err) {
        setAppState((prev) => ({ ...prev, isLoading: false }));
        toast.error("Failed to register an account.");
      });
  };

  return (
    <div className="bg-light-yellow px-10 py-5 rounded-md text-black space-y-5 2xl:w-1/5">
      <p className="font-bold text-2xl">Register an account</p>

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
            {appState.isLoading ? "Registering..." : "Register"}
          </button>

          <Link href="/login">
            <p className="mt-5">Back to login</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
