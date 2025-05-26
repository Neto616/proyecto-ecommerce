import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'; 

function SideBar({ isOpen, onClose }){
    const [categorias, setCategorias] = useState({});

  const fetchCategoria = async () => {
    try {
      const resultado = await fetch("http://localhost:3001/api/categoria", {method: "GET"});
      const data = await resultado.json();
      setCategorias(data.info);
    } catch (error) {
      console.error("Ha ocurrido un error: "+error);
    }
  }

  useEffect(()=> {
    fetchCategoria();
  }, [])
    
    return(
        <nav className={`sidebar-menu ${isOpen ? 'active' : ''}`}>
            {/* <button type="button" className="close-sidebar-button" onClick={onClose}>
                <FontAwesomeIcon icon="fas fa-times"/>
            </button> */}
            <h3 onClick={onClose}>Categorías</h3>
            <ul>
                { categorias?.data?.map((e, i) => <li key={i}><Link to={"/productos?section="+e.id}>{e.nombre}</Link></li>)}
            </ul>
        </nav>
    );
}

export default SideBar;