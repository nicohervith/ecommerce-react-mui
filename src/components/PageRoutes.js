import { Routes, Route } from "react-router-dom";
import CheckOutCard from "./CheckOutCard";
import CheckOutPage from "./CheckOutPage";
import PageLink from "./PageLink";
import App from '../App';
import Products from "./Products";


const PageRoutes = () => {
  return (
    <div>
      <PageLink />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/shoppingcart" element={<CheckOutPage />} />
        <Route path="/checkout" element={<CheckOutCard />} />
      </Routes>
    </div>
  );
};

export default PageRoutes;
