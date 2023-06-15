import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { gapi } from "gapi-script";
import './App.scss';
import Home from './pages/Home/Home';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';

// gapi.load("client:auth2", () => {
//   gapi.client.init({
//     clientId: process.env.REACT_APP_GOOGLE_ID,
//     plugin_name: "chat",
//   });
// });

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/signin' element={<Signin></Signin>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
