import './App.css';
import Product from './components/Product';
import Navbar from './components/Navbar';
import Products from './components/Products';
import CheckOutPage from './components/CheckOutPage';
import CheckOutCard from "./components/CheckOutCard";
import PageRoutes from './components/PageRoutes';



function App() {
  return (
    <div className="App">
        <Navbar /> 
        <PageRoutes/>
    </div>
  );
}

export default App;
