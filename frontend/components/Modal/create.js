import axios from "axios";
import Modal from "./index";
import Router from "next/router";
import toast from "react-hot-toast";
import useLocalStorage from "../../hooks/useLocalStorage";

import { useState } from "react";
import { useApp } from "../../hooks/useApp";

const CreateModal = () => {
  const [data, setData] = useState({});
  const [token, _] = useLocalStorage("user_token");
  const { appState, setAppState } = useApp();

  const handleConfirm = () => {
    setAppState((prev) => ({ ...prev, isLoading: true }));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const formData = new FormData();
    formData.append("file", data.file || appState.currentEdit.image);
    formData.append("name", data.name || appState.currentEdit.title);
    formData.append("sku", data.sku || appState.currentEdit.sku);

    axios
      .post(`http://localhost:3001/product/create`, formData, config)
      .then(() => {
        toast.success("Successfully updated product information");
        setAppState((prev) => ({ ...prev, isLoading: false }));
        Router.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update product information. Try re-login");
        setAppState((prev) => ({ ...prev, isLoading: false }));
      });
  };

  const handleInput = (e) => {
    if (e.target.name === "file") {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    } else {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  return (
    <Modal handleConfirm={handleConfirm}>
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
        <h3
          className="text-lg font-medium leading-6 text-gray-900"
          id="modal-title"
        >
          Create product
        </h3>

        <div className="mt-5 text-black space-y-4">
          <div className="space-x-5 flex justify-between items-center">
            <label>Image</label>
            <input type="file" name="file" onChange={handleInput} />
          </div>

          <div className="space-x-5 flex justify-between items-center">
            <label>SKU</label>
            <input
              placeholder="SKU..."
              name="sku"
              className="px-2 py-1 rounded-md text-white"
              onChange={handleInput}
            />
          </div>

          <div className="space-x-5 flex justify-between items-center">
            <label>Name</label>
            <input
              placeholder="Name..."
              name="name"
              className="px-2 py-1 rounded-md text-white"
              onChange={handleInput}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateModal;
