import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Index from "./views/inicio.jsx";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faBars, faShoppingCart, faHeart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import TopBar from "./components/TopBar.jsx";
import SideBar from "./components/SideBar.jsx";
import Carrito from "./views/carrito.jsx";

library.add(faSearch, faBars, faShoppingCart, faHeart, faUserCircle);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar el sidebar
    const handleOpenSidebar = () => {
        setIsSidebarOpen(true);
    };
    
    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };
  return (
    <BrowserRouter>
    <div className="App">
      <TopBar onBurgerClick={handleOpenSidebar}/>
        <SideBar isOpen={isSidebarOpen} onClose={handleCloseSidebar}/>
      <Routes>
        <Route path="/" element= {<Index />}></Route>
        <Route path="/carrito" element= {<Carrito/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
