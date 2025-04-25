import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { showToast } from "../redux/slices/ToastSlice";
import { useDispatch, useSelector } from "react-redux";
import { TextLabelInput } from "./FormFields";
import { addNewProduct } from "../services/dashboardService";
import { errorHandler, formatDateTime, pounds } from "../utils/utils";
import Spinner from "./Spinner";

export default function AddProduct({refetch, currentPage}) {
  const userId = useSelector((state) => state.auth.userId);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const closeModal = () => setShowModal(false);

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-primary text-white h-10 cursor-pointer px-5 rounded-md flex items-center gap-3 hover:bg-primary-dark"
      >
        <FontAwesomeIcon icon={faPlus} /> Add Product
      </button>
      {showModal && (
        <Modal maxW={"max-w-xl"}>
          <div className="bg-white px-5 py-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-300">
              <h1 className="font-semibold text-2xl">Add New Product</h1>
              <FontAwesomeIcon
                onClick={closeModal}
                icon={faTimes}
                className="text-2xl text-primary cursor-pointer"
              />
            </div>
            {/* form */}
            <div className="mt-5">
              <Formik
                initialValues={{
                  name: "",
                  stock: "",
                  price: "",
                }}
                validationSchema={Yup.object({
                  name: Yup.string().required("Product name is required"),
                  stock: Yup.number()
                    .typeError("Stock must be a number")
                    .required("Stock is required")
                    .integer("Must be an integer")
                    .positive("Stock must be a positive number"),
                  price: Yup.number()
                    .typeError("Price must be a number")
                    .required("Price is required")
                    .positive("Price must be a positive number"),
                })}
                onSubmit={async (values) => {
                  setLoading(true);
                  let data = {
                    ...values,
                    qtySold: 0,
                    userId: userId,
                    createdAt: formatDateTime(new Date()),
                  };
                  const response = await addNewProduct(data);
                  if (!response.error) {
                    setLoading(false);
                    dispatch(
                      showToast({
                        status: "success",
                        message: "Product added successfully",
                      })
                    );
                    closeModal();
                    if (currentPage) refetch()
                  } else {
                    setLoading(false);
                    dispatch(
                      showToast({
                        status: "error",
                        message: errorHandler(response.data),
                      })
                    );
                  }
                }}
              >
                <Form>
                  <div className="grid grid-cols-1 gap-4">
                    <TextLabelInput
                      label="Product Name"
                      name="name"
                      type="text"
                      placeholder="Iphone 14 Pro"
                    />
                    <TextLabelInput
                      label={`Price (${pounds})`}
                      name="price"
                      type="number"
                      placeholder="1500"
                    />
                    <TextLabelInput
                      label="Stock"
                      name="stock"
                      type="number"
                      placeholder="100"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={closeModal}
                      className="cursor-pointer font-semibold w-full block h-12 rounded-lg mt-8 bg-red-500 text-white hover:bg-red-700 active:scale-[0.98]"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="cursor-pointer font-semibold w-full block h-12 rounded-lg mt-8 bg-primary text-white hover:bg-primary-dark active:scale-[0.98]"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <Spinner /> : "Add"}
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
