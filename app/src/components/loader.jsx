// src/components/Loading/Loading.jsx (con estilos globales inyectados)
import React, { useEffect } from 'react';

/**
 * Componente de carga con estilos en línea y animación inyectada globalmente.
 * NOTA: Esta es una forma menos común y generalmente no la mejor práctica
 * para componentes reusables debido a la inyección de estilos globales.
 * @param {object} props - Propiedades del componente.
 * @param {string} [props.message='Cargando...'] - Mensaje a mostrar debajo del spinner.
 * @param {boolean} [props.showBar=false] - Si muestra una barra de carga animada (indefinida).
 */
const Loading = ({ message = 'Cargando...', showBar = false }) => {

  // Efecto para inyectar los keyframes CSS cuando el componente se monta
  useEffect(() => {
    const styleId = 'loading-spinner-animation-style';
    if (!document.getElementById(styleId)) {
      const styleSheet = document.createElement("style");
      styleSheet.setAttribute("id", styleId);
      styleSheet.innerHTML = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes progress-animation {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
      `;
      document.head.appendChild(styleSheet);
    }
    // No necesitamos un return de limpieza para este caso si el loader se mantiene
    // globalmente mientras la app está activa o si es un componente de top-level.
    // Si fuera un componente que se monta y desmonta muy frecuentemente, se consideraría.
  }, []);

  const loadingContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };

  const loadingSpinnerStyle = {
    border: '8px solid rgba(0, 0, 0, 0.1)', // Aumentamos el grosor del borde
    borderTop: '8px solid #3498db', // Aumentamos el grosor del borde
    borderRadius: '50%',
    width: '60px', // Hacemos el spinner más grande
    height: '60px', // Hacemos el spinner más grande
    animation: 'spin 1s linear infinite',
    marginBottom: '20px', // Aumentamos el margen para separar del texto
  };

  const loadingTextStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '20px', // Aumentamos el tamaño de la fuente
    color: '#333',
    fontWeight: 'bold', // Opcional: para que el texto sea más prominente
  };

  const loadingBarContainerStyle = {
    width: '150px', // Aumentamos el ancho de la barra contenedora
    backgroundColor: '#f3f3f3',
    borderRadius: '5px',
    height: '15px', // Aumentamos la altura de la barra
    overflow: 'hidden',
    marginTop: '30px', // Aumentamos el margen para separar
  };

  const loadingBarStyle = {
    height: '100%',
    backgroundColor: '#4CAF50',
    animation: 'progress-animation 2s infinite',
  };

  return (
    <div style={loadingContainerStyle}>
      <div style={loadingSpinnerStyle}></div>
      {message && <p style={loadingTextStyle}>{message}</p>}
      {showBar && (
        <div style={loadingBarContainerStyle}>
          <div style={loadingBarStyle}></div>
        </div>
      )}
    </div>
  );
};

export default Loading;