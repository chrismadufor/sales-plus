import React, { useEffect, useState } from "react";
import SearchBox from "../../components/SearchBox";
import { formatPoundsNumber, getSerialNumber } from "../../utils/utils";
import EmptyTable from "../../components/EmptyTable";
import Table from "../../components/Table";
import Spinner from "../../components/Spinner";
import AddProduct from "../../components/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { errorHandler } from "../../utils/utils";
import { fetchUserProducts } from "../../services/dashboardService";
import { showToast } from "../../redux/slices/ToastSlice";
import { saveProducts } from "../../redux/slices/dashboardSlice";

export default function Products() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const paginationData = {
    current_page: 1,
  };
  const columns = ["Product Name", "Price", "Stock", "Qty Sold", "Created At"];
  const mobileColumns = ["Product Name", "Price", "Stock", "Actions"];

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
                    {/* <td className="px-5 capitalize font-semibold">
                      <button
                        // onClick={() => onOpenModal(item)}
                        className="primary_bg text-white rounded-md px-3 py-1"
                      >
                        View
                      </button>
                    </td> */}
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
    </div>
  );
}
