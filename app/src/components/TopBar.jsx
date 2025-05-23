// src/components/TopBar.jsx
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TopBar({ onBurgerClick }){
    const navigate = useNavigate();
    return(
        <header className="top-bar">
            <div className="top-bar-left">
                <button type="button" className="burger-button" aria-label="Menú de Categorías" onClick={onBurgerClick}>
                    <FontAwesomeIcon icon="fa-solid fa-bars" />
                </button>
                <Link to="/" className="logo">Mi Tienda</Link>
            </div>
            <div className="top-bar-center">
                <div className="search-bar">
                    <input type="text" placeholder="Buscar productos..." />
                    <button type="submit" aria-label="Buscar">
                        <FontAwesomeIcon icon="fa-solid fa-search" />
                    </button>
                </div>
            </div>
            <div className="top-bar-right">
                <Link to="/carrito" className="icon-link" aria-label="Carrito de Compras">
                    <FontAwesomeIcon icon="fa-solid fa-shopping-cart" />
                    <span className="cart-count">0</span>
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