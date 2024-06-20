import { Routes, Route, Navigate } from "react-router-dom";
import Checkout from "./Chekoutform/Checkout";
import CheckOutPage from "./Pages/CheckOutPage";
import PageLink from "./PageLink";
import SignIn from "./Pages/templates/signin/Signin";
import SignUp from "./Pages/templates/signup/Signup";
import ProductCreate from "./Pages/products/create-product/ProductCreate";
import ProductList from "./Pages/products/ProductList";
import UpdateProduct from "./Pages/products/update-product/UpdateProduct";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

const PageRoutes = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/shoppingcart" element={<CheckOutPage />} />
          <Route path="/checkout-page" element={<Checkout />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<ProductList />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/product-create" element={<ProductCreate />} />
            <Route
              path="/editar-producto/:productId"
              element={<UpdateProduct />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default PageRoutes;
