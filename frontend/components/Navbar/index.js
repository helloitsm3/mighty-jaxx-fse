import { useRouter } from "next/router";

const Navbar = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    router.push("/login");
  };

  return (
    <div className="bg-primary min-h-screen">
      <nav className="px-5 py-3 flex justify-between items-center">
        <span className="text-xl font-bold text-dark-brown">
          Mighty Jaxx Dashboard
        </span>

        <button
          className="bg-red-500 px-3 py-1 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <main className="flex justify-center items-center py-10 flex-col">
        {children}
      </main>
    </div>
  );
};

export default Navbar;
