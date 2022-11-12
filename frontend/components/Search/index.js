import api from "../../utils/api.util";
import { useApp } from "../../hooks/useApp";

const Search = () => {
  const { appState, setAppState } = useApp();

  const handleChange = (e) => {
    setAppState((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const { search } = appState;
    api.product
      .search(search)
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
    <form
      onSubmit={handleSearch}
      className="px-10 py-2 rounded-md my-5 md:w-1/3 w-full outline-none flex flex-row space-x-5"
    >
      <input
        placeholder="Search product..."
        className="px-3 py-2 rounded-md w-full outline-none bg-black"
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={appState.isLoading}
        className={`${
          appState.isLoading ? "bg-gray-500" : "bg-black"
        } px-5 rounded-md text-mighty-yellow font-bold text-lg hover:bg-gray-800`}
      >
        {appState.isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default Search;
