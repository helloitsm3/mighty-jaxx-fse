import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalStorage";

const Login = () => {
  const router = useRouter();
  const [_, setToken] = useLocalStorage("user_token");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/auth/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then(function (response) {
        setToken(response.data.token);
        router.push("/");
      })
      .catch(function () {
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
              className="py-1 px-3 rounded-md text-white"
              type="email"
              placeholder="Enter email"
              name="email"
              required
            />
          </div>

          <div className="flex justify-between w-full items-center">
            <label htmlFor="password">Password</label>
            <input
              className="py-1 px-3 rounded-md text-white"
              type="password"
              placeholder="Enter Password"
              name="password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 rounded-md py-3 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
