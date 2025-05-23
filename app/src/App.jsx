import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Index from "./views/inicio.jsx";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faBars, faShoppingCart, faHeart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import TopBar from "./components/TopBar.jsx";
import SideBar from "./components/SideBar.jsx";
import Carrito from "./views/carrito.jsx";
import CatalogoProductos from "./views/productList.jsx";
import Favoritos from "./views/favoritos.jsx";
import MiCuenta from "./views/miCuenta.jsx";
import DetalleProductos from "./views/detalle.jsx";
import IniciarSesion from "./views/iniciar_sesion.jsx";

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
        <Route path="/iniciar-sesion" element= {<IniciarSesion/>}></Route>
        <Route path="/" element= {<Index />}></Route>
        <Route path="/carrito" element= {<Carrito/>}></Route>
        <Route path="/productos" element= {<CatalogoProductos/>}></Route>
        <Route path="/favoritos" element= {<Favoritos/>}></Route>
        <Route path="/mi-cuenta" element= {<MiCuenta/>}></Route>
        <Route path="/detalle" element= {<DetalleProductos/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
