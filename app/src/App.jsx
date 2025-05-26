import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Index from "./views/inicio.jsx";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faBars, faShoppingCart, faHeart, 
  faUserCircle, faChevronLeft, faChevronRight, faSortAmountUp, faSortAmountDown, faSortAlphaDown, faSortAlphaUp,
  faMinus, faPlus, faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
//Componentes para el usuario
import RegistroUsuario from "./views/usuario/registro.jsx"
import IniciarSesion from "./views/usuario/iniciar_sesion.jsx";
import MiCuenta from "./views/usuario/miCuenta.jsx";
import Carrito from "./views/usuario/carrito.jsx";
import Favoritos from "./views/usuario/favoritos.jsx";
//Componentes en general
import TopBar from "./components/TopBar.jsx";
import SideBar from "./components/SideBar.jsx";
import CatalogoProductos from "./views/productList.jsx";
import DetalleProductos from "./views/detalle.jsx";

library.add( faSearch, faBars, faShoppingCart, faHeart, faUserCircle, faChevronLeft, faChevronRight, 
  faSortAmountUp, faSortAmountDown, faSortAlphaDown, faSortAlphaUp, faMinus, faPlus, faUser, faEnvelope,
  faLock, faEye, faEyeSlash );

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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
      <SideBar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <Routes>
        <Route path="/crear-cuenta" element= {<RegistroUsuario/>}></Route>
        <Route path="/iniciar-sesion" element= {<IniciarSesion/>}></Route>
        <Route path="/" element= {<Index />}></Route>
        <Route path="/carrito" element= {<Carrito/>}></Route>
        <Route path="/productos" element= {<CatalogoProductos/>}></Route>
        <Route path="/favoritos" element= {<Favoritos/>}></Route>
        <Route path="/mi-cuenta" element= {<MiCuenta/>}></Route>
        <Route path="/detalle/:producto" element= {<DetalleProductos/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
