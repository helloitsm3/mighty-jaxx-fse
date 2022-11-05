import moment from "moment";
import { useApp } from "../../hooks/useApp";

const MobileView = () => {
  const { appState, setAppState } = useApp();

  return (
    <div className="md:hidden flex flex-col">
      {appState?.productlist?.docs?.map((doc, index) => {
        const { _id, sku, title, image, createdAt, updatedAt } = doc;

        return (
          <div className="bg-white my-3 rounded-md flex flex-col" key={index}>
            <img src={image} className="rounded-md object-cover h-48" />

            <div className="px-5 py-3">
              <p>ID: {_id}</p>
              <p className="font-bold text-xl mt-3">Name: {title}</p>
              <p>SKU: {sku}</p>
              <p>
                Created at: {moment(createdAt).format("DD-MMM-YYYY, HH:mma")}
              </p>
              <p>
                Last Updated: {moment(updatedAt).format("DD-MMM-YYYY, HH:mma")}
              </p>

              <div className="flex flex-row space-x-5 mt-5">
                <button
                  className="bg-blue-500 px-4 py-2 rounded-md w-full"
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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileView;
