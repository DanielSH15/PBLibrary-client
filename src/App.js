import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home'
import About from './pages/About/about'
import SignUp from './pages/SignUp/SignUp.js'
import Login from './pages/Login/login'
import './App.css';
import { useState } from "react";
import Update from "./pages/Update/Update";
import Admin from "./pages/Admin/Admin";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
       <div>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/registration" exact element = {<SignUp />} />
        <Route path = "/login" exact element = {<Login />} />
        <Route path = "/update" exact element = {<Update />} />
        <Route path="/admin" exact element = {<Admin />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
