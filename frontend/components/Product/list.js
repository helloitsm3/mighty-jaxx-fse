import axios from "axios";
import Router from "next/router";
import toast from "react-hot-toast";
import useLocalStorage from "../../hooks/useLocalStorage";

import { useApp } from "../../hooks/useApp";

const ProductList = () => {
  const { appState, setAppState } = useApp();
  const [token, _] = useLocalStorage("user_token");
  const docs = appState.productlist.docs;

  if (docs?.length === 0) {
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

  return (
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
        {docs?.map((doc, index) => {
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
  );
};

export default ProductList;
