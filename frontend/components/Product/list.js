import moment from "moment";
import Router from "next/router";
import toast from "react-hot-toast";
import api from "../../utils/api.util";
import useLocalStorage from "../../hooks/useLocalStorage";

import { useApp } from "../../hooks/useApp";
import MobileView from "./mobile";

const ProductList = () => {
  const [token, _] = useLocalStorage("user_token");
  const { appState, setAppState } = useApp();
  const { hasNextPage, hasPrevPage, nextPage, prevPage } = appState.productlist;

  const handleRemove = (id) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    api.product
      .remove(id, config)
      .then(() => {
        toast.success("Successfully deleted product");
        Router.reload();
      })
      .catch(() => toast.error("Failed to delete product. Try re-login"));
  };

  const handleNextPage = async () => {
    const productlist = await api.product.pagination(nextPage);
    setAppState((prev) => ({ ...prev, productlist: productlist.data }));
  };

  const handlePrevPage = async () => {
    const productlist = await api.product.pagination(prevPage);
    setAppState((prev) => ({ ...prev, productlist: productlist.data }));
  };

  const handleCreateModal = () => {
    setAppState((prev) => ({ ...prev, isCreateModalActive: true }));
  };

  const RenderAction = (doc) => {
    if (appState?.user?.role === "admin") {
      return (
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
            onClick={() => handleRemove(doc._id)}
          >
            Remove
          </button>
        </td>
      );
    }
  };

  const RenderCreateButton = () => {
    if (appState?.user?.role === "admin") {
      return (
        <div className="md:my-5 text-right space-x-5">
          <button
            onClick={handleCreateModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Create product
          </button>
        </div>
      );
    }
  };

  return (
    <div className="w-full px-5">
      <RenderCreateButton />

      {appState?.productlist?.docs?.length === 0 ? (
        <div className="flex justify-center">There is currently no product</div>
      ) : (
        <div className="w-full">
          <table className="hidden md:table table-auto w-full">
            <thead>
              <tr className="text-left">
                <th>ID</th>
                <th>Image</th>
                <th>SKU</th>
                <th>Name</th>
                <th className="text-right">Created at</th>
                <th className="text-right">Updated at</th>
                {appState?.user?.role === "admin" && (
                  <th className="text-right">Action</th>
                )}
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
                    <td className="text-right">
                      {moment(createdAt).format("DD-MMM-YYYY, HH:mma")}
                    </td>
                    <td className="text-right">
                      {moment(updatedAt).format("DD-MMM-YYYY, HH:mma")}
                    </td>
                    {RenderAction(doc)}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <MobileView />

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
      )}
    </div>
  );
};

export default ProductList;
