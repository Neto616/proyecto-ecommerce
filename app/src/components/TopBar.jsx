// src/components/TopBar.jsx
import React, { useEffect, useState } from "react";
import { Link, UNSAFE_getTurboStreamSingleFetchDataStrategy, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../style.css"; 
import eventBus from "../utils/eventBus.js";

function TopBar({ onBurgerClick }){
    const navigate = useNavigate();
    const [conteo, setConteo] = useState(0);
    const [busqueda, setBusqueda] = useState("");
    const [resultados, setResultados] = useState({});
    
    const getResults = async () => {
        try {
            console.log("Busqueda desde el getResults: ",busqueda)
            const resultado = await fetch(`http://localhost:3001/api/productos?b=${busqueda}`, {method: "GET"});
            const data = await resultado.json();
            console.log(data)
            setResultados(data.result.data);
            return;
        } catch (error) {
            console.log("Ha sucedido un error en el buscador: ", error)
        }
    }

    const getCountProducts = async () => {
        try {
            console.log("Conteo de los productos");
            const resultado = await fetch("http://localhost:3001/api/conteo_productos", { method: "GET" });
            const data = await resultado.json();
            setConteo(data.info?.data || 0);
        } catch (error) {
            console.error("Ha ocurrido un error: ", error);
            return;
        }
    }

    useEffect(() => {
        // 1. Carga inicial del conteo (cuando el componente se monta)
        getCountProducts();

        // 2. Suscribirse al evento 'cartUpdated' (cuando un producto se añade/elimina)
        const handleCartUpdate = () => {
            console.log("Evento 'cartUpdated' recibido en TopBar. Actualizando conteo...");
            getCountProducts(); // Volver a pedir el conteo actualizado
        };

        eventBus.on('cartUpdated', handleCartUpdate);
        eventBus.on('userLoggedIn', handleCartUpdate);

        // 3. ¡NUEVA SUSCRIPCIÓN! Escuchar el evento 'userLoggedOut'
        const handleUserLoggedOut = () => {
            console.log("Evento 'userLoggedOut' recibido. Restableciendo conteo a 0.");
            setConteo(0); // Restablece el conteo a cero directamente
        };
        eventBus.on('userLoggedOut', handleUserLoggedOut); // <--- NUEVA SUSCRIPCIÓN

        // 4. Función de limpieza para desuscribirse de ambos eventos
        return () => {
            eventBus.off('cartUpdated', handleCartUpdate);
            eventBus.off('userLoggedIn', handleCartUpdate);
            eventBus.off('userLoggedOut', handleUserLoggedOut); 
        };
    }, []);

    useEffect(()=>{    
        if(busqueda.length <= 3) return;
        else {
            getResults();
            console.log("La busqueda trae estos datos: "+resultados)
        }
    }, [busqueda]);

    return(
        <header className="top-bar">
            <div className="top-bar-left">
                <Link to="/" className="logo">
                    <img src="/LogoETop.png" alt="Logo de la tienda" className="logo-img" />
                </Link>
                <button
                    type="button"
                    className="burger-button"
                    onClick={onBurgerClick}
                >
                    <FontAwesomeIcon icon="fa-solid fa-bars" className="burger-icon" />
                    <span className="burger-text">Categorías</span>
                </button>

                
            </div>
            <div className="top-bar-center">
                <div className="search-bar">
                    <input type="text" placeholder="Buscar productos..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
                    <button type="submit" aria-label="Buscar">
                        <FontAwesomeIcon icon="fa-solid fa-search" />
                    </button>
                </div>

                <div className={`search-results-dropdown ${busqueda.length > 3 ? "show" : ""}`}> {/*Añadir clase show para que se pueda visualizar*/}
                    {resultados.length ? (resultados.map((e, i)=> {
                        return <div 
                        onClick = {()=> {
                            navigate(`/detalle/${e.sku}`)
                            setBusqueda("");
                        }}
                        className="search-result-item" key={i}><img src={`http://localhost:3001/images/${e.sku}/${e.imagen}`} alt={e.nombre} /><span>{e.nombre}</span></div>
                    })) : null}
        </div>
            </div>
            <div className="top-bar-right">
                <Link to="/carrito" className="icon-link" aria-label="Carrito de Compras">
                    <FontAwesomeIcon icon="fa-solid fa-shopping-cart" />
                    <span className="cart-count">{conteo ?? "0"}</span>
                </Link>
                <Link to="/favoritos" className="icon-link" aria-label="Favoritos">
                    <FontAwesomeIcon icon="fa-solid fa-heart" />
                </Link>
                <Link to="/mi-cuenta" className="icon-link" aria-label="Mi Cuenta">
                    <FontAwesomeIcon icon="fa-solid fa-user-circle" />
                </Link>
            </div>
        </header>
    );
}

export default TopBar;