import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../style.css"; 

import iconElectronica from '../icons/icn_tecnologia.png';
import iconHogar from '../icons/icn_hogar.png';
import iconMascotas from '../icons/icn_mascotas.png';
import iconFarmacia from '../icons/icn_farmacia.png';
import iconCarnes from '../icons/icn_carnes.png';
import iconFrutas from '../icons/icn_frutas_verduras.png';

function SideBar({ isOpen, onClose }) {
  const [categorias, setCategorias] = useState([]);
  const sidebarRef = useRef(null);

  const iconMap = {
    "Electronica": iconElectronica,
    "Hogar": iconHogar,
    "Mascotas": iconMascotas,
    "Farmacia": iconFarmacia,
    "Carnes Frías": iconCarnes,
    "Frutas y verduras": iconFrutas,
  };

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const resultado = await fetch("http://localhost:3001/api/categoria");
        const data = await resultado.json();
        setCategorias(data?.info?.data || []);
      } catch (error) {
        console.error("Ha ocurrido un error: " + error);
      }
    };

    fetchCategoria();
  }, []);

  // Cerrar al hacer clic fuera del sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <nav ref={sidebarRef} className={`sidebar-menu ${isOpen ? "active" : ""}`}>
        <h3>Categorías</h3>
        <ul className="sidebar-list">
          {categorias.map((cat, i) => (
            <li key={i} className="sidebar-item">
              <Link to={`/productos?section=${cat.id}`} className="sidebar-link">
                <img
                  src={iconMap[cat.nombre] || ''}
                  alt={cat.nombre}
                  className="sidebar-icon"
                />
                <span className="sidebar-text">{cat.nombre}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default SideBar;
