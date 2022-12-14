import { useApp } from "../../hooks/useApp";

const Modal = ({ children, handleConfirm, handleClose }) => {
  const { appState } = useApp();

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg card-bg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">{children}</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                onClick={handleConfirm}
                disabled={appState.isLoading}
                className={`inline-flex w-full justify-center rounded-md border border-transparent ${
                  appState.isloading ? "bg-gray-500" : "bg-black"
                } px-4 py-2 text-base font-medium text-mighty-yellow shadow-sm hover:bg-gray-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm`}
              >
                {appState.isLoading ? "Loading..." : "Confirm"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
