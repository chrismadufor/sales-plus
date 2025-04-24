import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../../components/TopNav";
import SideNav from "../../components/SideNav";

export default function DashboardLayout() {
  return (
    <div>
      <TopNav />
      <SideNav />
      <div className="py-20 px-3 md:px-5 xl:px-10 xl:ml-56 min-h-screen bg-gray-50">
        {/* <Breadcrumb
          homeElement={false}
          separator={<span> | </span>}
          activeClasses="primary_text font-semibold underline"
          containerClasses="flex items-center pb-3 max-w-7xl mx-auto"
          listClasses="hover:underline mx-2 text-gray-300 text-sm"
          capitalizeLinks
        /> */}
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
