import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlus,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { showToast } from "../redux/slices/ToastSlice";
import { useDispatch } from "react-redux";
import { SelectInput, SingleSelect, TextLabelInput } from "./FormFields";
import { formatPoundsNumber, getSerialNumber } from "../utils/utils";
import Table from "./Table";
import EmptyTable from "./EmptyTable";
import AddCustomer from "./AddCustomer";

export default function AddSale() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const loading = false;
  const [acceptTerms, setAcceptTerms] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setProductData(productDataRaw);
    setProductList([]);
  };

  const customerData = [
    {
      label: "Chris Madufor",
      value: "1",
    },
    {
      label: "Cynthia Madufor",
      value: "2",
    },
    {
      label: "Zara Madufor",
      value: "3",
    },
    {
      label: "Chiazoka Madufor",
      value: "4",
    },
  ];

  const productDataRaw = [
    {
      label: "Electric Kettle",
      value: "1",
      price: "120",
    },
    {
      label: "Philips Iron",
      value: "2",
      price: "220",
    },
    {
      label: "Ox Standing Fan",
      value: "3",
      price: "190",
    },
    {
      label: "Bedsheet Set",
      value: "4",
      price: "110",
    },
  ];

  const columns = ["Product Name", "Quantity", "Amount", "Actions"];
  const [productData, setProductData] = useState(productDataRaw);
  const [productList, setProductList] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const onProductSelectChange = (option) => {
    // check if it exists in product list
    let productIsSelected = productList.some(
      (item) => item.value === option.value
    );
    if (!productIsSelected) {
      // add to product list
      let temp = [...productList];
      temp.push({ ...option, qty: 1 });
      setProductList(temp);
    } else {
      // else show toast warning
      dispatch(
        showToast({
          status: "error",
          message: `${option.label} has been selected`,
        })
      );
    }
  };

  const deleteItem = (id) => {
    let temp = [...productList];
    let arr = temp.filter((item) => item.value !== id);
    setProductList(arr);
    console.log(arr);
  };

  const increaseCount = (index) => {
    let temp = [...productList];

    temp[index].qty = temp[index].qty + 1;

    setProductList(temp);
  };

  const decreaseCount = (index) => {
    let temp = [...productList];

    if (temp[index].qty <= 1) return;

    temp[index].qty = temp[index].qty - 1;

    setProductList(temp);
  };

  useEffect(() => {
    let temp = [...productList];
    let total = 0;
    temp.map(
      (item) => (total = Number(total) + Number(item.price) * Number(item.qty))
    );
    setTotalValue(total);
  }, [productList]);

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-primary text-white h-10 cursor-pointer px-5 rounded-md flex items-center gap-3 hover:bg-primary-dark"
      >
        <FontAwesomeIcon icon={faPlus} /> Add Sale
      </button>
      {showModal && (
        <Modal maxW={"max-w-3xl"}>
          <div className="bg-white px-5 py-8 h-[600px] overflow-scroll">
            <div className="flex items-center justify-between pb-3 border-b border-gray-300">
              <h1 className="font-semibold text-2xl">Add New Sale</h1>
              <FontAwesomeIcon
                onClick={closeModal}
                icon={faTimes}
                className="text-2xl text-primary cursor-pointer"
              />
            </div>
            {/* form */}
            <div className="mt-5 overflow-scroll">
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
                  console.log("Login", values);
                  dispatch(
                    showToast({
                      status: "success",
                      message: "Log in successful",
                    })
                  );
                }}
              >
                <Form>
                  {/* Add customer */}
                  <div className="pb-5 mb-5 border-b border-gray-300">
                    <p className="font-semibold text-xl">
                      Customer Information
                    </p>
                    <p className="mb-4">
                      Select the customer from the dropdown below or add a new
                      customer
                    </p>
                    <div className="">
                      <div className="w-full mb-2">
                        <SingleSelect
                          label=""
                          name="customer"
                          type="text"
                          placeholder="Select a customer"
                          data={customerData}
                        />
                      </div>
                      <AddCustomer />
                    </div>
                  </div>
                  {/* Items */}
                  <div className="pb-5 mb-5 border-b border-gray-300">
                    <div className="mb-5">
                      <p className="font-semibold text-xl">
                        Sales Items Information
                      </p>
                      <p className="mb-4">
                        Select the product from the dropdown below and modify
                        the quantity or remove an item from the table below
                      </p>
                      <div>
                        <SingleSelect
                          label="Select a product"
                          data={productData}
                          change={onProductSelectChange}
                          // value={selectedFacility}
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        {productList && productList.length > 0 ? (
                          <Table
                            // data={paginationData}
                            columns={columns}
                            mobileColumns={columns}
                            // changePage={changePage}
                          >
                            {productList.map((item, index) => (
                              <tr
                                onClick={() => {}}
                                className="border-b h-14"
                                key={index}
                              >
                                <td className="pl-5 w-12 text-center">
                                  {getSerialNumber(index, 1)}
                                </td>
                                <td className="px-5 capitalize">
                                  {item.label}
                                </td>
                                <td className="px-5">
                                  <button onClick={() => decreaseCount(index)}>
                                    <FontAwesomeIcon
                                      icon={faMinusCircle}
                                      className="text-sm text-red-500 mr-2 cursor-pointer"
                                    />
                                  </button>{" "}
                                  {item.qty}{" "}
                                  <button onClick={() => increaseCount(index)}>
                                    <FontAwesomeIcon
                                      icon={faPlusCircle}
                                      className="text-sm text-primary ml-2 cursor-pointer"
                                    />
                                  </button>
                                </td>
                                <td className="px-5">
                                  {formatPoundsNumber(item.price * item.qty)}
                                </td>
                                <td className="px-5 capitalize font-semibold">
                                  <button
                                    onClick={() => deleteItem(item.value)}
                                    className="bg-red-500 text-sm text-white rounded-md px-3 py-1 cursor-pointer"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </Table>
                        ) : (
                          <EmptyTable loading={loading} columns={columns} />
                        )}
                      </div>
                      {productList.length > 0 && (
                        <div className="flex items-center justify-between px-5 mt-3">
                          <p className="font-semibold">Total:</p>
                          <p className="font-semibold text-3xl">
                            {formatPoundsNumber(totalValue)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* closing */}
                  {productList.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="terms"
                          id=""
                          className="checkbox"
                          value={acceptTerms}
                          onChange={() => setAcceptTerms(!acceptTerms)}
                        />
                        <p>
                          I confirm that this sale has been paid for by the
                          customer
                        </p>
                      </div>
                      <div className="flex gap-3 items-center mt-6 justify-end">
                        <button
                          onClick={closeModal}
                          className="cursor-pointer font-semibold block h-12 rounded-lg px-7 bg-red-500 text-white hover:bg-red-700 active:scale-[0.98]"
                          type="submit"
                        >
                          Cancel
                        </button>
                        <button
                          className={`cursor-pointer font-semibold block h-12 rounded-lg px-7 bg-primary text-white hover:bg-primary-dark active:scale-[0.98] ${
                            !acceptTerms && "opacity-50 pointer-events-none"
                          }`}
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? <Spinner /> : "Submit"}
                        </button>
                      </div>
                    </div>
                  )}
                </Form>
              </Formik>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
