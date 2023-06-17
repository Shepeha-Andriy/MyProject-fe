import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { gapi } from "gapi-script";
import './App.scss';
import Home from './pages/Home/Home';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import { useSelector } from 'react-redux';
import Header from './components/Header/Header';

// gapi.load("client:auth2", () => {
//   gapi.client.init({
//     clientId: process.env.REACT_APP_GOOGLE_ID,
//     plugin_name: "chat",
//   });
// });

function App() {
  const { user } = useSelector(state => state.user)
  const { pathname } = useLocation()

  const shouldHideHeader = ['/signup', '/signin'].includes(pathname);

  return (
    <div>
      {!shouldHideHeader && <Header></Header>}

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        {
          !user && (
            <>
              <Route path='/signin' element={<Signin></Signin>}></Route>
              <Route path='/signup' element={<Signup></Signup>}></Route>
            </>
          )
        }
        <Route path='*' element={<Home></Home>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
