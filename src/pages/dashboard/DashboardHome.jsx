import React, { useEffect, useState } from "react";
import StatsItem from "../../components/StatsItem";
import {
  faBoxesStacked,
  faCoins,
  faFileInvoiceDollar,
  faList,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import AddSale from "../../components/AddSale";
import AddProduct from "../../components/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  errorHandler,
  formatPoundsNumber,
  formatNumber,
  getFirstName,
} from "../../utils/utils";
import {
  fetchUserCustomers,
  fetchUserProducts,
  fetchUserSales,
} from "../../services/dashboardService";
import { showToast } from "../../redux/slices/ToastSlice";
import {
  saveCustomers,
  saveProducts,
  saveSales,
} from "../../redux/slices/dashboardSlice";

export default function DashboardHome() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inventoryValue, setInventoryValue] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [topSales, setTopSales] = useState([]);
  const [saleTotal, setSaleTotal] = useState(0);

  const getProducts = async (id) => {
    setLoading(true);
    const response = await fetchUserProducts(id);
    if (!response.error) {
      let data = response.data;
      setProducts(data);
      dispatch(saveProducts(data));

      // get inventory count and value
      let count = 0;
      let value = 0;
      for (let i = 0; i < data.length; i++) {
        count = count + Number(data[i].stock);
        value = value + Number(data[i].stock) * Number(data[i].price);
      }
      setInventoryCount(count);
      setInventoryValue(value);

      let topProducts = [...data]
        .sort((a, b) => (b.qtySold ?? 0) - (a.qtySold ?? 0)) // handle undefined/null
        .slice(0, 4);
      setTopProducts(topProducts);
      setLoading(false);
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

  const getCustomers = async (id) => {
    const response = await fetchUserCustomers(id);
    if (!response.error) {
      setCustomers(response.data);
      dispatch(saveCustomers(response.data));
    } else {
      dispatch(
        showToast({
          status: "error",
          message: errorHandler(response.data),
        })
      );
    }
  };

  const getSales = async (id) => {
    setLoading(true);
    const response = await fetchUserSales(id);
    if (!response.error) {
      setLoading(false);
      let data = response.data;
      setSales(data);
      dispatch(saveSales(data));

      let value = 0;
      for (let i = 0; i < data.length; i++) {
        value = value + Number(data[i].total);
      }
      setSaleTotal(value);

      let topSales = [...data]
        .sort((a, b) => (b.price ?? 0) - (a.price ?? 0)) // handle undefined/null
        .slice(0, 4);
      setTopSales(topSales);
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
    getCustomers(userId);
    getSales(userId);
  }, []);

  return (
    <div>
      <div className="my-5 flex items-center justify-between">
        <h1 className="font-semibold text-3xl">
          Hi {getFirstName(userProfile.name)}!
        </h1>
        <div className="hidden xl:flex gap-5">
          <AddProduct refetch={() => getProducts(userId)} currentPage={true} />
          <AddSale refetch={() => getSales(userId)} currentPage={true} />
        </div>
      </div>
      <p className="font-semibold mb-3 text-lg">Dashboard Analytics</p>
      {/* small boxes */}
      <div className="grid grid-cols-3 gap-5">
        <StatsItem
          loading={loading}
          title={"Total Sales"}
          value={formatPoundsNumber(saleTotal)}
          icon={faCoins}
        />
        <StatsItem
          loading={loading}
          title={"Total Sales Count"}
          value={sales.length}
          icon={faList}
        />
        <StatsItem
          loading={loading}
          title={"Total Products"}
          value={products.length}
          icon={faBoxesStacked}
        />
        <StatsItem
          loading={loading}
          title={"Total Customers"}
          value={customers.length}
          icon={faUsers}
        />
        <StatsItem
          loading={loading}
          title={"Inventory Value"}
          value={formatPoundsNumber(inventoryValue)}
          icon={faFileInvoiceDollar}
        />
        <StatsItem
          loading={loading}
          title={"Inventory Count"}
          value={formatNumber(inventoryCount)}
          icon={faBoxesStacked}
        />
      </div>

      {/* tables */}
      <div className="grid grid-cols-2 gap-5 mt-8">
        <div className="bg-white border border-gray-300 rounded-md p-5">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Top Sales</p>
            <a href="/dashboard/sales">
              <p className="px-3 py-1 border border-gray-200 hover:border-primary cursor-pointer rounded-md bg-gray-50">
                See all
              </p>
            </a>
          </div>
          <div className="mt-3">
            <table className="w-full border border-gray-300 border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left">Customer Name</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Total</th>
                </tr>
              </thead>

              {topSales.length > 0 && (
                <tbody>
                  {topSales.map((item, index) => (
                    <tr key={index}>
                      <td className="text-left">{item.customer.name}</td>
                      <td className="text-left">{item.createdAt}</td>
                      <td className="text-left">
                        {formatPoundsNumber(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {topSales.length === 0 && (
              <p className="h-[200px] flex items-center justify-center">
                No data found
              </p>
            )}
          </div>
        </div>
        <div className="bg-white border border-gray-300 rounded-md p-5">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Top Products</p>
            <a href="/dashboard/products">
              <p className="px-3 py-1 border border-gray-200 hover:border-primary cursor-pointer rounded-md bg-gray-50">
                See all
              </p>
            </a>
          </div>
          <div className="mt-3">
            <table className="w-full border border-gray-300 border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left">Product Name</th>
                  <th className="text-left">Number sold</th>
                  <th className="text-left">Total Sales</th>
                </tr>
              </thead>
              {topProducts.length > 0 && (
                <tbody>
                  {topProducts.map((item, index) => (
                    <tr key={index}>
                      <td className="text-left">{item.name}</td>
                      <td className="text-left">{item.qtySold}</td>
                      <td className="text-left">
                        {formatPoundsNumber(
                          Number(item.qtySold) * Number(item.price)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {topProducts.length === 0 && (
              <p className="h-[200px] flex items-center justify-center">
                No data found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
