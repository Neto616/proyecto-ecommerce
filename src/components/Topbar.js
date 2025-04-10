import React from 'react';
import '../css/Topbar.css';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <div className="topbar-logo" style={{ cursor: 'pointer' }}>
          <img
            src="/img/LogoEcommerce(2).png"
            alt="ShopEase Logo"
            className="topbar-logo-img"
          />
        </div>

        <button className="topbar-categorias-btn">Categorías</button>

        <div className="topbar-search">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="topbar-search-input"
          />
          <button className="topbar-search-button">
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="topbar-icons">
        <FaUser
          className="topbar-icon"
          title="Cuenta"
          onClick={() => navigate('/login')}
        />
        <FaShoppingCart className="topbar-icon" title="Carrito" />
      </div>
    </div>
  );
};

export default Topbar;
