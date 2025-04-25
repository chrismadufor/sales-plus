import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { showToast } from "../redux/slices/ToastSlice";
import { useDispatch, useSelector } from "react-redux";
import { TextLabelInput } from "./FormFields";
import { errorHandler, formatDateTime } from "../utils/utils";
import { addNewCustomer } from "../services/dashboardService";
import Spinner from "./Spinner";

export default function AddCustomer({ refetch, currentPage }) {
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
        <FontAwesomeIcon icon={faPlus} /> Add Customer
      </button>
      {showModal && (
        <Modal maxW={"max-w-xl"}>
          <div className="bg-white px-5 py-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-300">
              <h1 className="font-semibold text-2xl">Add New Customer</h1>
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
                  email: "",
                  phone: "",
                }}
                validationSchema={Yup.object({
                  name: Yup.string().required("Name is required"),
                  phone: Yup.string().required("Phone number is required"),
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Email is required"),
                })}
                onSubmit={async (values) => {
                  setLoading(true);
                  let data = {
                    ...values,
                    userId: userId,
                    createdAt: formatDateTime(new Date()),
                  };
                  const response = await addNewCustomer(data);
                  if (!response.error) {
                    setLoading(false);
                    dispatch(
                      showToast({
                        status: "success",
                        message: "Customer added successfully",
                      })
                    );
                    closeModal();
                    if (currentPage) refetch();
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
                      label="Full Name"
                      name="name"
                      type="text"
                      placeholder="Jane Doe"
                    />
                    <TextLabelInput
                      label="Email Address"
                      name="email"
                      type="text"
                      placeholder="janedoe@gmail.com"
                    />
                    <TextLabelInput
                      label="Phone Number"
                      name="phone"
                      type="text"
                      placeholder="+4472343875"
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
                      {loading ? <Spinner /> : "Submit"}
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
