import { Routes, Route } from "react-router-dom";
import Checkout from "../Chekoutform/Checkout";
import CheckOutPage from "../Pages/CheckOutPage";
import SignIn from "../Pages/templates/signin/Signin";
import SignUp from "../Pages/templates/signup/Signup";
import ProductCreate from "../Pages/products/create-product/ProductCreate";
import ProductList from "../Pages/products/ProductList";
import UpdateProduct from "../Pages/products/update-product/UpdateProduct";
import ProtectedRoute from "./ProtectedRoute";

const PageRoutes = () => {
  return (
    <div>
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
    </div>
  );
};

export default PageRoutes;
