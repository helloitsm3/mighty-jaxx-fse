import moment from "moment";
import Router from "next/router";
import toast from "react-hot-toast";
import api from "../../utils/api.util";
import useLocalStorage from "../../hooks/useLocalStorage";

import { useApp } from "../../hooks/useApp";

const DesktopView = () => {
  const { appState, setAppState } = useApp();
  const [token, _] = useLocalStorage("user_token");

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
      .catch((err) => {
        toast.error("Failed to delete product. Try re-login");
      });
  };

  const RenderActionButton = (doc) => {
    if (appState?.user?.role === "admin") {
      return (
        <div className="flex flex-row space-x-3 mt-5">
          <button
            className="bg-primary px-4 py-2 rounded-md w-full"
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
            className="bg-red-500 px-4 py-2 rounded-md w-full"
            onClick={() => handleRemove(doc._id)}
          >
            Remove
          </button>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-wrap flex-row justify-center">
      {appState?.productlist?.docs?.map((doc, index) => {
        const { _id, sku, title, image, createdAt, updatedAt } = doc;

        return (
          <div
            className="bg-white my-3 rounded-md flex flex-col mr-5 md:w-fit w-full"
            key={index}
          >
            <img
              src={image}
              className="rounded-md object-contain h-60 w-full mt-4"
            />

            <div className="p-4">
              <p>ID: {_id}</p>
              <p className="font-bold text-xl mt-3">Name: {title}</p>
              <p>SKU: {sku}</p>
              <p>
                Created at: {moment(createdAt).format("DD-MMM-YYYY, HH:mma")}
              </p>
              <p>
                Last Updated: {moment(updatedAt).format("DD-MMM-YYYY, HH:mma")}
              </p>

              {RenderActionButton(doc)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DesktopView;
