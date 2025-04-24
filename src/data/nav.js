import {
  faCogs,
  faHome,
  faList,
  faMoneyBill,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const navLinks = [
  {
    name: "dashboard",
    icon: faHome,
    link: "/dashboard/",
  },
  {
    name: "products",
    icon: faList,
    link: "/dashboard/products",
  },
  {
    name: "sales",
    icon: faMoneyBill,
    link: "/dashboard/sales",
  },
  {
    name: "customers",
    icon: faUsers,
    link: "/dashboard/customers",
  },
  // {
  //   name: "settings",
  //   icon: faCogs,
  //   link: "/dashboard/settings",
  // },
];
