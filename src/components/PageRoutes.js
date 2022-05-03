import { Routes, Route } from "react-router-dom";
import CheckOutCard from "./CheckOutCard";
import CheckOutPage from "./CheckOutPage";
import PageLink from "./PageLink";
import Products from "./Products";
import SignIn from "./Signin";
import SignUp from "./Signup";


const PageRoutes = () => {
  return (
    <div>
      <PageLink />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/shoppingcart" element={<CheckOutPage />} />
        <Route path="/checkout" element={<CheckOutCard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default PageRoutes;
