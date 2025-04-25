import React, { useEffect, useState } from "react";
import SearchBox from "../../components/SearchBox";
import { errorHandler, getSerialNumber } from "../../utils/utils";
import EmptyTable from "../../components/EmptyTable";
import Table from "../../components/Table";
import Spinner from "../../components/Spinner";
import AddCustomer from "../../components/AddCustomer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCustomers } from "../../services/dashboardService";
import { saveCustomers } from "../../redux/slices/dashboardSlice";
import { showToast } from "../../redux/slices/ToastSlice";

export default function Customers() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
    const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const paginationData = {
    current_page: 1,
  };
  const columns = ["Customer Name", "Email", "Phone Number", "Created At"];
  const mobileColumns = ["Customer Name", "Phone Number", "Email", "Actions"];

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
    </div>
  );
}
