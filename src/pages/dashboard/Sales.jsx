import React, { useEffect, useState } from "react";
import SearchBox from "../../components/SearchBox";
import { formatPoundsNumber, getSerialNumber } from "../../utils/utils";
import EmptyTable from "../../components/EmptyTable";
import Table from "../../components/Table";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { errorHandler } from "../../utils/utils";
import { showToast } from "../../redux/slices/ToastSlice";
import AddSale from "../../components/AddSale";
import { fetchUserSales } from "../../services/dashboardService";
import { saveSales } from "../../redux/slices/dashboardSlice";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../components/Modal";

export default function Sales() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState([]);
  const paginationData = {
    current_page: 1,
  };
  const columns = [
    "Customer Name",
    "Amount",
    "Items Purchased",
    "Date",
    "Actions",
  ];
  const mobileColumns = ["Customer Name", "Amount", "Date", "Actions"];

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const onOpenModal = (item) => {
    console.log(item);
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const getSales = async (id) => {
    setLoading(true);
    const response = await fetchUserSales(id);
    if (!response.error) {
      setLoading(false);
      setSales(response.data);
      dispatch(saveSales(response.data));
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

  const getItems = (data) => {
    let final = "";
    for (let i = 0; i < data.length; i++) {
      let str = `${data[i].label}(${data[i].qty})`;
      final = str + ", " + final;
    }
    return final;
  };

  useEffect(() => {
    getSales(userId);
  }, []);

  return (
    <div>
      <div className="my-5 flex justify-between">
        <div>
          <h1 className="font-semibold text-3xl">All Sales</h1>
          <p>Track and manage your sales transactions</p>
        </div>
        <AddSale refetch={() => getSales(userId)} currentPage={true} />
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
            {sales && sales.length > 0 ? (
              <Table
                // data={paginationData}
                columns={columns}
                mobileColumns={mobileColumns}
                // changePage={changePage}
              >
                {sales.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => {}}
                    className="border-b h-14"
                  >
                    <td className="pl-5 w-12 text-center">
                      {getSerialNumber(index, paginationData.current_page)}
                    </td>
                    <td className="px-5 capitalize">{item.customer.name}</td>
                    <td className="px-5">{formatPoundsNumber(item.total)}</td>
                    <td className="px-5">{getItems(item.items)}</td>
                    <td className="px-5">{item.createdAt}</td>
                    <td className="px-5 capitalize font-semibold">
                      <button
                        onClick={() => onOpenModal(item)}
                        className="bg-primary text-white rounded-md px-3 py-1 cursor-pointer"
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
          <div className="md:hidden w-full">
            {sales && sales.length > 0 ? (
              <Table
                // data={paginationData}
                columns={columns}
                mobileColumns={mobileColumns}
                // changePage={changePage}
              >
                {sales.map((item, index) => (
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
              <h1 className="font-semibold text-2xl">Sales Details</h1>
              <FontAwesomeIcon
                onClick={closeModal}
                icon={faTimes}
                className="text-2xl text-primary cursor-pointer"
              />
            </div>
            {/* form */}
            <div className="mt-5">
              <div>
                <h1 className="text-xs mb-1 uppercase font-semibold">
                  Customer Name
                </h1>
                <p className="">{selectedItem.customer.name}</p>
              </div>
              <div className="mt-5">
                <h1 className="text-xs mb-1 uppercase font-semibold">Date</h1>
                <p className="">{selectedItem.createdAt}</p>
              </div>
              <div className="mt-5">
                <h1 className="text-xs font-semibold mb-3 uppercase">
                  Purchased items
                </h1>
                <div>
                  {selectedItem.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex item-center justify-between py-2 border-t border-gray-200"
                    >
                      <p className="">{item.label}</p>
                      <p className="">
                        {item.qty} x {item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                <h1 className="mb-1 uppercase font-semibold">Total</h1>
                <p className="font-semibold text-xl">{formatPoundsNumber(selectedItem.total)}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
