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
import Footer from './components/Footer/Footer';
import Cart from './pages/Cart/Cart';
import Order from './pages/Order/Order';
import Category from './pages/Category/Category';
import PrivateRoute from './components/PrivateRoute/PrivateRout';
import { initSocket, socket } from './utils/io';
import { useEffect } from 'react';

// gapi.load("client:auth2", () => {
//   gapi.client.init({
//     clientId: process.env.REACT_APP_GOOGLE_ID,
//     plugin_name: "chat",
//   });
// });

function App() {
  const { user } = useSelector(state => state.user)
  const { pathname } = useLocation()

  useEffect(() => {
    initSocket()
  }, [user]);

  const shouldHideHeaderAndFooter = ['/signup', '/signin'].includes(pathname);

  return (
    <div className='app'>
      {!shouldHideHeaderAndFooter && <header className='app__header'><Header></Header></header>}

      <main className='app__main'>
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
          <Route path='/category/phone' element={<Category></Category>}></Route>
          <Route path='/category/pc' element={<Category></Category>}></Route>
          <Route path='/category/electronic' element={<Category></Category>}></Route>
          <Route path='/category/clothes' element={<Category></Category>}></Route>
          <Route path='/category/instrument' element={<Category></Category>}></Route>
          <Route path='/category/other' element={<Category></Category>}></Route>

          <Route path='/cart' element={<PrivateRoute><Cart></Cart></PrivateRoute>}></Route>
          <Route path='/order' element={<PrivateRoute><Order></Order></PrivateRoute>}></Route>
          <Route path='*' element={<Home></Home>}></Route>
        </Routes>
      </main>
      <ToastContainer></ToastContainer>

      {!shouldHideHeaderAndFooter && <footer className='app__footer'><Footer></Footer></footer>}
    </div>
  );
}

export default App;
