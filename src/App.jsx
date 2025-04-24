import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signin from "./pages/Signin";
import HomeLayout from "./pages/layout/HomeLayout";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardLayout from "./pages/layout/DashboardLayout";
import Products from "./pages/dashboard/Products";
import Sales from "./pages/dashboard/Sales";
import Customers from "./pages/dashboard/Customers";
import Settings from "./pages/dashboard/Settings";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/sales" element={<Sales />} />
            <Route path="/dashboard/customers" element={<Customers />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
