// src/views/inicio.js
import React from 'react';
import Topbar from '../components/Topbar';
import '../css/inicio.css';

const Inicio = () => {
  return (
    <>
      <Topbar />
      <div className="inicio-content">
        {/* Aquí va el resto del contenido de la vista Inicio */}
        <h1>Página de Inicio</h1>
      </div>
    </>
  );
};

export default Inicio;
