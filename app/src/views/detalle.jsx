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
        const result = await fetch(`http://localhost:3001${pathName}`, {method: "GET"});
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

    useEffect(()=>{
      window.scrollTo(0,0);
      getData(location.pathname);
    }, [location]);

    return (
        <main className="main-content">
            <div className="product-detail-container">
                <div className="product-gallery">
                    <div className="main-image">
                        <img
                        src={"http://localhost:3001/"+datos.sku+"/"+datos.imagen}
                        alt={datos.nombre}
                        />
                    </div>
                </div>
        <div className="product-info">
          <h1>{datos.nombre}</h1>
          <p className="price">${datos.precio_format}</p>
          <p className="description">
            {datos.descripcion}
          </p>

          <div className="product-options">
            <label for="quantity" style= {{textAlign: "left"}}>Cantidad:</label>
            <div className="quantity-selector">
              <button type="button" id="decrement-qty" onClick={()=> quantity > 1 ? setQuantity(quantity - 1) : null}>-</button>
              <input type="number" id="quantity" value={quantity} min="1" max={datos.existencia} readOnly/>
              <button type="button" id="increment-qty" onClick={()=> quantity < datos.existencia ? setQuantity(quantity + 1) : null}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button type="button" className="btn-primary">
              <FontAwesomeIcon icon="fa-shopping-cart"/> Agregar al Carrito
            </button>
            <button type="button" className="btn-favorite">
              <FontAwesomeIcon icon="fa-heart"/> Añadir a Favoritos
            </button>
          </div>

        </div>
      </div>

      <section className="related-products">
        <h2>Productos Relacionados</h2>
        <div className="product-grid">
          {relacionados.length ? (
            relacionados.map((e, i) => <ProductCard key = {i} nombre = {e.nombre} precio = {e.precio} sku = {e.sku} imgName={e.imagen}/>)
          ) : null}
        </div>
      </section>
    </main>
    );
}

export default DetalleProductos;