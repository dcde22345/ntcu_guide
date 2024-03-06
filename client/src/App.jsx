import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState,useEffect } from "react";
import  Axios  from "axios";
import { Navigate } from 'react-router-dom';

Axios.defaults.withCredentials=true;

// import './styles/bottomNavbar.css'
import Index from "./component/Index";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Register from "./component/Register";
import AddShop from "./component/AddShop";
import Feedback from "./component/Feedback";
import MainShopInfo from "./component/ShopInfo/MainShopInfo";
import Profile from './component/Profile';

function App() {
  const pagesName = ["首頁", "登入", "新增店家", "回饋", "店家資訊"];
  const pagesPath = ["/", "/login", "addShop", "feedback", "shopInfo"];
  const loginPagesName = ["首頁", "登出", "新增店家", "回饋", "店家資訊"];
  const loginPagesPath = ["/", "/logout", "addShop", "feedback", "shopInfo"];
  const [gotoLogin,setGotoLogin] = useState(false);

  useEffect(()=>{
    Axios.get("http://localhost:3001"+"/login")
    .then((response)=>{
        if(response.data.loggedIn===false){
          setGotoLogin(true);
        }else{
          setGotoLogin(false);
        }
    });
},[]);

if(gotoLogin)
{
  return (
    <BrowserRouter>
      {/*導覽列*/}
      <Navbar bg="light" expand="lg">
        <Container>
          <Link className="navbar-brand" to="/">
            <div className="w-25">
              <img
                className="w-100"
                src="src/assets/brand.png"
                alt="NTCU-Guide"
              />
            </div>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-2">
              {pagesName.map((pageName, index) => (
                <li className="nav-item">
                  <Link className="nav-link" to={pagesPath[index]} key={index}>
                    {pageName}
                  </Link>
                </li>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar className="position-fixed w-100 bottom-0" bg="light" expand="lg">
        <Nav className="flex-row justify-content-around w-100">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i style={{fontSize: 25}}className="bi bi-house"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="addShop">
              <i style={{fontSize: 25}}className="bi bi-plus-circle-fill"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="profile">
              <i style={{fontSize: 25}}className="bi bi-person-circle"></i>
            </Link>
          </li>
        </Nav>
      </Navbar>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/addShop" element={<AddShop />}></Route>
        <Route path="/feedback" element={<Feedback />}></Route>
        <Route path="/shopInfo" element={<MainShopInfo />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}else{
  return (
    <BrowserRouter>
      {/*導覽列*/}
      <Navbar bg="light" expand="lg">
        <Container>
          <Link className="navbar-brand" to="/">
            <div className="w-25">
              <img
                className="w-100"
                src="src/assets/brand.png"
                alt="NTCU-Guide"
              />
            </div>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-2">
              {loginPagesName.map((pageName, index) => (
                <li className="nav-item">
                  <Link className="nav-link" to={loginPagesPath[index]} key={index}>
                    {pageName}
                  </Link>
                </li>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar className="position-fixed w-100 bottom-0" bg="light" expand="lg">
        <Nav className="flex-row justify-content-around w-100">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i style={{fontSize: 25}}className="bi bi-house"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="addShop">
              <i style={{fontSize: 25}}className="bi bi-plus-circle-fill"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="profile">
              <i style={{fontSize: 25}}className="bi bi-person-circle"></i>
            </Link>
          </li>
        </Nav>
      </Navbar>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/addShop" element={<AddShop />}></Route>
        <Route path="/feedback" element={<Feedback />}></Route>
        <Route path="/shopInfo" element={<MainShopInfo />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

  
}

export default App;

