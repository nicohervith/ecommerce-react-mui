import { Routes, Route } from "react-router-dom";
import Checkout from "./Chekoutform/Checkout";
import CheckOutPage from "./Pages/CheckOutPage";
import PageLink from "./PageLink";
import Products from "./Pages/products/Products";
import SignIn from "./Pages/templates/signin/Signin";
import SignUp from "./Pages/templates/signup/Signup";
import ProductCreate from "./Pages/products/create-product/ProductCreate";
import ProductList from "./Pages/products/ProductList";

const PageRoutes = () => {
  return (
    <div>
      <PageLink />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/shoppingcart" element={<CheckOutPage />} />
        <Route path="/checkout-page" element={<Checkout />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product-create" element={<ProductCreate />} />
        <Route path="/product-list" element={<ProductList />} />
      </Routes>
    </div>
  );
};

export default PageRoutes;
