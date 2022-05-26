import './App.css';
import Navbar from "./components/Pages/navbar/Navbar";
import PageRoutes from './components/PageRoutes';
import {useEffect} from 'react'
import {auth} from './firebase'
import {actionTypes} from './reducer';
import {useStateValue} from './StateProvider';



function App() {

  const [{ user }, dispatch] = useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      console.log(authUser);
      if (authUser){
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      }
    })
  },[])
  return (
    <div className="App">
        <Navbar /> 
        <PageRoutes/>
    </div>
  );
}

export default App;
