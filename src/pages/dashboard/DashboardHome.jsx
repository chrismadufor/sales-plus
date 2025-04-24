import React from "react";
import StatsItem from "../../components/StatsItem";
import {
  faBoxesStacked,
  faCoins,
  faFileInvoiceDollar,
  faList,
  faPiggyBank,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import AddSale from "../../components/AddSale";
import AddProduct from "../../components/AddProduct";

export default function DashboardHome() {
  return (
    <div>
      <div className="my-5 flex items-center justify-between">
        <h1 className="font-semibold text-3xl">Hi Chris!</h1>
        <div className="hidden xl:flex gap-5">
          <AddProduct />
          <AddSale />
        </div>
      </div>
      <p className="font-semibold mb-3 text-lg">Dashboard Analytics</p>
      {/* small boxes */}
      <div className="grid grid-cols-3 gap-5">
        <StatsItem title={"Total Sales"} value={"€20,000"} icon={faCoins} />
        <StatsItem
          title={"Total Sales (This Month)"}
          value={"€5,000"}
          icon={faPiggyBank}
        />
        <StatsItem
          title={"Total Products"}
          value={"546"}
          icon={faBoxesStacked}
        />
        <StatsItem title={"Total Customers"} value={"28"} icon={faUsers} />
        <StatsItem
          title={"Inventory Value"}
          value={"€250,000"}
          icon={faFileInvoiceDollar}
        />
        <StatsItem title={"Total Sales Count"} value={"43"} icon={faList} />
        {/* <StatsItem
          title={"Total Sales"}
          value={"€20,000"}
          icon={faBoxesStacked}
        /> */}
      </div>

      {/* tables */}
      <div className="grid grid-cols-2 gap-5 mt-8">
        <div className="bg-white border border-gray-300 rounded-md p-5">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Latest Sales</p>
            <p className="px-3 py-1 border border-gray-200 hover:border-primary cursor-pointer rounded-md bg-gray-50">
              See all
            </p>
          </div>
          <div className="mt-3">
            <table className="w-full border border-gray-300 border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left">Customer Name</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Total (€)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left">Chris Madufor</td>
                  <td className="text-left">23rd April, 2025</td>
                  <td className="text-left">515</td>
                </tr>
                <tr>
                  <td className="text-left">Chris Madufor</td>
                  <td className="text-left">23rd April, 2025</td>
                  <td className="text-left">515</td>
                </tr>
                <tr>
                  <td className="text-left">Chris Madufor</td>
                  <td className="text-left">23rd April, 2025</td>
                  <td className="text-left">515</td>
                </tr>
                <tr>
                  <td className="text-left">Chris Madufor</td>
                  <td className="text-left">23rd April, 2025</td>
                  <td className="text-left">515</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white border border-gray-300 rounded-md p-5">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Top Products</p>
            <p className="px-3 py-1 border border-gray-200 hover:border-primary cursor-pointer rounded-md bg-gray-50">
              See all
            </p>
          </div>
          <div className="mt-3">
            <table className="w-full border border-gray-300 border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left">Product Name</th>
                  <th className="text-left">Number sold</th>
                  <th className="text-left">Total Sales (€)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left">Mini strawberry cake</td>
                  <td className="text-left">30</td>
                  <td className="text-left">8,600</td>
                </tr>
                <tr>
                  <td className="text-left">Chicken Pizza</td>
                  <td className="text-left">12</td>
                  <td className="text-left">2,400</td>
                </tr>
                <tr>
                  <td className="text-left">Vanilla cupcake</td>
                  <td className="text-left">7</td>
                  <td className="text-left">2,150</td>
                </tr>
                <tr>
                  <td className="text-left">Brownies</td>
                  <td className="text-left">24</td>
                  <td className="text-left">800</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
