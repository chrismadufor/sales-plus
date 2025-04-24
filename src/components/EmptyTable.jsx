import Spinner from "./Spinner";
import React from "react";

export default function EmptyTable({ loading, columns, mobileColumns }) {
  return (
    <div>
      <div
        className={`hidden md:block border rounded-sm overflow-hidden border-gray-300 bg-white`}
      >
        <table className="w-full border-collapse text-sm text-gray-700 rounded-sm">
          <thead className="bg-gray-100">
            <tr className="h-14">
              <th className="pl-5 font-normal w-12">S/N</th>
              {columns.map((column, index) => (
                <th className="px-5 font-normal text-left" key={index}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <div className="h-60 w-full flex items-center justify-center">
          {loading ? <Spinner /> : <p>No data found</p>}
        </div>
      </div>
      {mobileColumns && (
        <div className={`md:hidden border border-gray-300 bg-white`}>
          <table className="w-full border-collapse text-sm text-gray-700 rounded-sm">
            <thead className="bg-gray-100">
              <tr className="h-14">
                <th className="pl-2 font-normal w-12">S/N</th>
                {mobileColumns.map((column, index) => (
                  <th className="px-2 text-left font-normal" key={index}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
          <div className="h-40 w-full flex items-center justify-center text-sm md:text-base">
            {loading ? <Spinner /> : <p>No data found</p>}
          </div>
        </div>
      )}
    </div>
  );
}
