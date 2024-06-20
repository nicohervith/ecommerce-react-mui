import { Routes, Route, Navigate } from "react-router-dom";
import Checkout from "./Chekoutform/Checkout";
import CheckOutPage from "./Pages/CheckOutPage";
import PageLink from "./PageLink";
import SignIn from "./Pages/templates/signin/Signin";
import SignUp from "./Pages/templates/signup/Signup";
import ProductCreate from "./Pages/products/create-product/ProductCreate";
import ProductList from "./Pages/products/ProductList";
import UpdateProduct from "./Pages/products/update-product/UpdateProduct";
import { useAuth } from "../contexts/AuthContext";

const PageRoutes = () => {
 /*  const { isLoggedIn, isAdmin } = useAuth(); */

  /* const renderProtectedRoute = (element, adminOnly) => {
    if (adminOnly && !isAdmin) {
      return <Navigate to="/" />;
    }
    if (!isLoggedIn) {
      return <Navigate to="/signin" />;
    }
    return element;
  }; */
  return (
    <div>
      <PageLink />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/shoppingcart" element={<CheckOutPage />} />
        <Route path="/checkout-page" element={<Checkout />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/product-create" element={<ProductCreate />} />
        <Route path="/editar-producto/:productId" element={<UpdateProduct />} /> */}

        <Route
          path="/product-create"
          element={(<ProductCreate />)}
        />

        <Route
          path="/editar-producto/:productId"
          element={(<UpdateProduct />)}
        />
      </Routes>
    </div>
  );
};

export default PageRoutes;
