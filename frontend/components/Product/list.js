import axios from "axios";
import Router from "next/router";
import toast from "react-hot-toast";
import useLocalStorage from "../../hooks/useLocalStorage";

import { useApp } from "../../hooks/useApp";

const ProductList = () => {
  const [token, _] = useLocalStorage("user_token");
  const { appState, setAppState } = useApp();
  const { hasNextPage, hasPrevPage, nextPage, prevPage } = appState.productlist;

  if (appState?.productlist?.docs?.length === 0) {
    return <div>There is currently no product</div>;
  }

  const handleRemove = (id) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .delete(`http://localhost:3001/product/${id}`, config)
      .then(() => {
        toast.success("Successfully deleted product");
        Router.reload();
      })
      .catch(() => toast.error("Failed to delete product. Try re-login"));
  };

  const handleNextPage = async () => {
    const productlist = await axios.get(
      `http://localhost:3001/product/${nextPage}`
    );

    setAppState((prev) => ({ ...prev, productlist: productlist.data }));
  };

  const handlePrevPage = async () => {
    const productlist = await axios.get(
      `http://localhost:3001/product/${prevPage}`
    );

    setAppState((prev) => ({ ...prev, productlist: productlist.data }));
  };

  return (
    <div className="w-full">
      <table className="table-auto w-full">
        <thead>
          <tr className="text-left">
            <th>ID</th>
            <th>Image</th>
            <th>SKU</th>
            <th>Name</th>
            <th className="text-right">Created at</th>
            <th className="text-right">Updated at</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {appState?.productlist?.docs?.map((doc, index) => {
            const { _id, sku, title, image, createdAt, updatedAt } = doc;

            return (
              <tr key={index}>
                <td>{_id}</td>
                <td>
                  <img src={image} alt="product image" className="w-32" />
                </td>
                <td>{sku}</td>
                <td>{title}</td>
                <td className="text-right">{createdAt}</td>
                <td className="text-right">{updatedAt}</td>
                <td className="text-right text-white space-x-1">
                  <button
                    className="bg-blue-500 px-4 py-1 rounded-md"
                    onClick={() =>
                      setAppState((prev) => ({
                        ...prev,
                        isModalActive: true,
                        currentEdit: doc,
                      }))
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 px-4 py-1 rounded-md"
                    onClick={() => handleRemove(_id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="my-10 text-right space-x-5">
        {hasPrevPage && (
          <button
            onClick={handlePrevPage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Prev Page
          </button>
        )}

        {hasNextPage && (
          <button
            onClick={handleNextPage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
