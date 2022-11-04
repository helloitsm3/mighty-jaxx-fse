import axios from "axios";
import { useApp } from "../../hooks/useApp";

const Search = () => {
  const { appState, setAppState } = useApp();

  const handleChange = (e) => {
    setAppState((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleSearch = () => {
    const { search } = appState;
    axios
      .post(`http://localhost:3001/product/search`, { search })
      .then((res) => {
        let data = {};

        if (search) {
          data = { docs: res.data };
        } else {
          data = res.data;
        }

        setAppState((prev) => ({
          ...prev,
          isLoading: false,
          productlist: data,
        }));

        Router.reload();
      })
      .catch(() => {
        setAppState((prev) => ({ ...prev, isLoading: false }));
      });
  };

  return (
    <div className="px-10 py-2 rounded-md my-5 md:w-1/3 w-full outline-none flex flex-row space-x-5">
      <input
        placeholder="Search product..."
        className="px-3 py-2 rounded-md w-full outline-none"
        onChange={handleChange}
      />

      <button
        onClick={handleSearch}
        disabled={appState.isLoading}
        className={`${
          appState.isLoading ? "bg-gray-500" : "bg-blue-500"
        } px-5 rounded-md`}
      >
        {appState.isLoading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default Search;
