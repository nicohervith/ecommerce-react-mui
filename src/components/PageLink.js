import { Link } from "react-router-dom";

const PageLink = () => {
  return (
    <nav>
      <li>
        <Link to="/"></Link>
        <Link to="/shoppingcart"></Link>
        <Link to="/checkout"></Link>
      </li>
    </nav>
  );
};

export default PageLink;
