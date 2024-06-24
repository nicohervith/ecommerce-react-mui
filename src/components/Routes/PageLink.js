import { Link } from "react-router-dom";

const PageLink = () => {
  return (
    <nav>
      <ul>
        <Link to="/"></Link>
        <Link to="/shoppingcart"></Link>
        <Link to="/checkout-page"></Link>
        <Link to="/signin"></Link>
        <Link to="/signup"></Link>
        <Link to="/product-create"></Link>
        <Link to="/product-list"></Link>
      </ul>
    </nav>
  );
};

export default PageLink;
