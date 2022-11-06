import DesktopView from "./desktop";
import api from "../../utils/api.util";

import { useApp } from "../../hooks/useApp";

const ProductList = () => {
  const { appState, setAppState } = useApp();
  const { hasNextPage, hasPrevPage, nextPage, prevPage } = appState.productlist;

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
      <div className="container mx-auto">
        <RenderCreateButton />
      </div>

      {appState?.productlist?.docs?.length === 0 ? (
        <div className="flex justify-center">There is currently no product</div>
      ) : (
        <div className="w-full">
          <DesktopView />

          <div className="my-10 text-right space-x-5 container mx-auto">
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
