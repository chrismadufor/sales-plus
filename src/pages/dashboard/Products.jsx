import React, { useEffect, useState } from "react";
import SearchBox from "../../components/SearchBox";
import { formatPoundsNumber, getSerialNumber, pounds } from "../../utils/utils";
import EmptyTable from "../../components/EmptyTable";
import Table from "../../components/Table";
import Spinner from "../../components/Spinner";
import AddProduct from "../../components/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { errorHandler } from "../../utils/utils";
import {
  editProduct,
  fetchUserProducts,
} from "../../services/dashboardService";
import { showToast } from "../../redux/slices/ToastSlice";
import { saveProducts } from "../../redux/slices/dashboardSlice";

import Modal from "../../components/Modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextLabelInput } from "../../components/FormFields";

export default function Products() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const paginationData = {
    current_page: 1,
  };
  const columns = [
    "Product Name",
    "Price",
    "Stock",
    "Qty Sold",
    "Created At",
    "Actions",
  ];

  const mobileColumns = ["Product Name", "Price", "Stock", "Actions"];

  const onOpenModal = (item) => {
    setSelectedProduct(item);
    setShowModal(true);
  };

  const getProducts = async (id) => {
    setLoading(true);
    const response = await fetchUserProducts(id);
    if (!response.error) {
      setLoading(false);
      setProducts(response.data);
      dispatch(saveProducts(response.data));
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

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    getProducts(userId);
  }, []);
  return (
    <div>
      <div className="my-5 flex justify-between">
        <div>
          <h1 className="font-semibold text-3xl">All Products</h1>
          <p>Manage your products and stock levels</p>
        </div>
        <AddProduct refetch={() => getProducts(userId)} currentPage={true} />
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
            {products && products.length > 0 ? (
              <Table
                // data={paginationData}
                columns={columns}
                mobileColumns={mobileColumns}
                // changePage={changePage}
              >
                {products.map((item, index) => (
                  <tr onClick={() => {}} className="border-b h-14" key={index}>
                    <td className="pl-5 w-12 text-center">
                      {getSerialNumber(index, 1)}
                    </td>
                    <td className="px-5 capitalize">{item.name}</td>
                    <td className="px-5">{formatPoundsNumber(item.price)}</td>
                    <td className="px-5">{item.stock}</td>
                    <td className="px-5">{item.qtySold}</td>
                    <td className="px-5">{item.createdAt}</td>
                    <td className="px-5 capitalize font-semibold">
                      <button
                        onClick={() => onOpenModal(item)}
                        className="bg-primary text-white rounded-md px-3 py-1"
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
            {products && products.length > 0 ? (
              <Table
                // data={paginationData}
                columns={columns}
                mobileColumns={mobileColumns}
                // changePage={changePage}
              >
                {products.map((item, index) => (
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
              <h1 className="font-semibold text-2xl">Edit Product</h1>
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
                  name: selectedProduct.name,
                  stock: selectedProduct.stock,
                  price: selectedProduct.price,
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
                  setEditLoading(true);
                  let data = {
                    id: selectedProduct.id,
                    values,
                  };
                  const response = await editProduct(data);
                  if (!response.error) {
                    setEditLoading(false);
                    dispatch(
                      showToast({
                        status: "success",
                        message: "Product updated successfully",
                      })
                    );
                    closeModal();
                    getProducts(userId);
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
                      {editLoading ? <Spinner /> : "Edit"}
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
