import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "../components/presentacion_productos/ProductCard.jsx";

function DetalleProductos () {
    const location = useLocation();
    const [datos, setDatos] = useState({});
    const [relacionados, setRelacionados] = useState({});
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();

    const getData = async (pathName) => {
      try {
        const result = await fetch(`http://localhost:3001/api${pathName}`, {method: "GET"});
        const data = await result.json();
        if(data.estatus !== 1) return alert("Ha ocurrido un error");
        console.log("Datos del producto: ", data);
        
        setDatos(data.result.data[0]);
        setRelacionados(data.result.productos_relacionados)
      } catch (error) {
        console.log("Ha ocurrido un error: ", error);
        navigate("/");        
      }
    }

    const addToCart = async (idProducto) => {
      try {
        const peticion = await fetch("http://localhost:3001/api/carrito", {method: "POST", body: JSON.stringify({ producto: idProducto, cantidad: quantity })});
        const data = await peticion.json();
        console.log(data)
        if(data.estatus === -2) {
                alert("Debes tener una cuenta para poder guardar productos al carrito")
                navigate("/");
        }else if(data.estatus === 0) alert("Ha ocurrido un error favor de intentarlo de nuevo");
        else alert("Se ha guardado el articulo en su carrito");
      } catch (error) {
        console.log("[Agregar producto detalle] Ha ocurrido un error: ", error);
        alert("Ha ocurrido algo favor de intentarlo nuevamente");
      }
    }

    useEffect(()=>{
      window.scrollTo(0,0);
      getData(location.pathname);
    }, [location]);

    return (
        <main className="page-container"> 
          <section className="detalle-producto"> 
            <div className="contenedor-detalle">
              <div className="detalle-imagen">
                <img
                  src={`http://localhost:3001/images/${datos.sku}/${datos.imagen}`}
                  alt={datos.nombre}
                />
              </div>

              <div className="detalle-info">
                <h1 className="titulo-producto">{datos.nombre}</h1>
                <p className="codigo-producto">Código de producto: {datos.sku}</p>

                <div className="separador" />

                <p className="subtitulo">Descripción:</p>
                <p className="descripcion-producto">{datos.descripcion}</p>

                <p className="precio-producto">${datos.precio_format}</p>

                <div className="selector-cantidad">
                  <label htmlFor="cantidad">Cantidad:</label>
                  <div className="botones-cantidad">
                    <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={() => quantity < datos.existencia && setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>

                <button className="boton-comprar" onClick={(e) => addToCart(datos.id)}>
                  <FontAwesomeIcon icon="fa-shopping-cart" />  Comprar ahora
                </button>
              </div>
            </div>
          </section>

          {/* Productos relacionados */}
          <section className="productos-relacionados">
            <h2 className="titulo-producto">Productos Relacionados</h2> 
            <div className="contenedor-detalle">
              {relacionados.length > 0 &&
                relacionados.map((e, i) => (
                  <ProductCard
                    key={i}
                    productId={e.id}
                    nombre={e.nombre}
                    precio={e.precio_format}
                    sku={e.sku}
                    imgName={e.imagen}
                    isFav=""
                  />
                ))}
            </div>
          </section>
        </main>

    );
}

export default DetalleProductos;