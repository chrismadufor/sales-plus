import React, { useEffect, useState } from "react";
import SearchBox from "../../components/SearchBox";
import { errorHandler, getSerialNumber } from "../../utils/utils";
import EmptyTable from "../../components/EmptyTable";
import Table from "../../components/Table";
import Spinner from "../../components/Spinner";
import AddCustomer from "../../components/AddCustomer";
import { useDispatch, useSelector } from "react-redux";
import {
  editCustomer,
  fetchUserCustomers,
} from "../../services/dashboardService";
import { saveCustomers } from "../../redux/slices/dashboardSlice";
import { showToast } from "../../redux/slices/ToastSlice";

import Modal from "../../components/Modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextLabelInput } from "../../components/FormFields";

export default function Customers() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const paginationData = {
    current_page: 1,
  };
  const columns = [
    "Customer Name",
    "Email",
    "Phone Number",
    "Created At",
    "Actions",
  ];
  const mobileColumns = ["Customer Name", "Phone Number", "Email", "Actions"];

  const onOpenModal = (item) => {
    setSelectedCustomer(item);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const getCustomers = async (id) => {
    setLoading(true);
    const response = await fetchUserCustomers(id);
    if (!response.error) {
      setLoading(false);
      setCustomers(response.data);
      dispatch(saveCustomers(response.data));
    } else {
      setLoading(false);
      dispatch(
        showToast({
          status: "error",
          message: errorHandler(response.data),
        })
      );
    }
  };

  useEffect(() => {
    getCustomers(userId);
  }, []);

  return (
    <div>
      <div className="my-5 flex justify-between">
        <div>
          <h1 className="font-semibold text-3xl">All Customers</h1>
          <p>Manage your customer relationships</p>
        </div>
        <AddCustomer refetch={() => getCustomers(userId)} currentPage={true} />
      </div>
      {/* search */}
      <div>
        <SearchBox />
      </div>
      {/* data */}
      {loading ? (
        <div className="mt-5">
          <Spinner />
        </div>
      ) : (
        <div className="flex gap-5 min-h-[500px] py-5">
          <div className="hidden md:block w-full">
            {customers && customers.length > 0 ? (
              <Table
                // data={paginationData}
                columns={columns}
                mobileColumns={mobileColumns}
                // changePage={changePage}
              >
                {customers.map((item, index) => (
                  <tr onClick={() => {}} className="border-b h-14" key={index}>
                    <td className="pl-5 w-12 text-center">
                      {getSerialNumber(index, paginationData.current_page)}
                    </td>
                    <td className="px-5 capitalize">{item.name}</td>
                    <td className="px-5">{item.email}</td>
                    <td className="px-5">{item.phone}</td>
                    <td className="px-5">{item.createdAt}</td>
                    <td className="px-5 capitalize font-semibold">
                      <button
                        onClick={() => onOpenModal(item)}
                        className=" bg-primary text-white rounded-md px-3 py-1 cursor-pointer"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </Table>
            ) : (
              <EmptyTable loading={loading} columns={columns} />
            )}
          </div>
          <div className="md:hidden w-full">
            {customers && customers.length > 0 ? (
              <Table
                // data={paginationData}
                columns={columns}
                mobileColumns={mobileColumns}
                // changePage={changePage}
              >
                {customers.map((item, index) => (
                  <tr onClick={() => {}} className="border-b h-14" key={index}>
                    <td className="pl-2 w-12 text-center">
                      {getSerialNumber(index, paginationData.current_page)}
                    </td>
                    <td className="px-2 capitalize">{item.fullName}</td>
                    <td className="px-2 capitalize font-semibold">
                      <button
                        // onClick={() => onOpenModal(item)}
                        className="primary_bg text-white rounded-md px-3 py-1"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </Table>
            ) : (
              <EmptyTable loading={loading} columns={columns} />
            )}
          </div>
        </div>
      )}
      {showModal && (
        <Modal maxW={"max-w-xl"}>
          <div className="bg-white px-5 py-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-300">
              <h1 className="font-semibold text-2xl">Edit Customer</h1>
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
                  name: selectedCustomer.name,
                  email: selectedCustomer.email,
                  phone: selectedCustomer.phone,
                }}
                validationSchema={Yup.object({
                  name: Yup.string().required("Name is required"),
                  phone: Yup.string().required("Phone number is required"),
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Email is required"),
                })}
                onSubmit={async (values) => {
                  setEditLoading(true);
                  let data = {
                    id: selectedCustomer.id,
                    values,
                  };
                  const response = await editCustomer(data);
                  if (!response.error) {
                    setEditLoading(false);
                    dispatch(
                      showToast({
                        status: "success",
                        message: "Customer updated successfully",
                      })
                    );
                    closeModal();
                    getCustomers(userId);
                  } else {
                    setEditLoading(false);
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
                      disabled={editLoading}
                    >
                      {editLoading ? <Spinner /> : "Submit"}
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
