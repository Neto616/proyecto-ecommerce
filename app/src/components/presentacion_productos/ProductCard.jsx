import React from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import eventBus from "../../utils/eventBus.js";

function ProductCard({ productId, nombre, precio, sku, imgName, isFav }) {
    const navigate = useNavigate();

    const addToFav = async (producto) => {
        try {
            const result = await fetch("http://localhost:3001/api/add_fav", {method: "POST", body: JSON.stringify({producto: producto})});
            const data = await result.json();
            console.log(data);
            if(data.estatus === -2) return alert("Para añadir un producto a favoritos necesita iniciar sesión");
            if(data.estatus == 1) return alert(!data.info.message.includes("desmarcado") ? "Producto añadido a su lista de favoritos" 
                                                                                        : "Producto eliminado de su lista de favoritos");
            return alert("Favor de intentarlo de nuevo más tarde")
            
        } catch (error) {
            console.log("Ha ocurrido un error favor de intentarlo luego");
            alert("Favor de intentarlo de nuevo");
        }    
    }

    const addToCart = async (e) => {
        try {
            e.preventDefault();
            const result = await fetch("http://localhost:3001/api/carrito", {method: "POST", body: JSON.stringify({ producto: e.target.value })});
            const data = await result.json();
            if(data.estatus === -2) {
                alert("Debes tener una cuenta para poder guardar productos al carrito")
                navigate("/");
            }
            else if(data.estatus === 0) alert("Ha ocurrido un error favor de intentarlo de nuevo");
            else {
                eventBus.emit('cartUpdated');
                alert("Se ha guardado el articulo en su carrito");
            }
        } catch (error) {
            console.log("Ha ocurrido un error favor de intentarlo luego");
            alert("Favor de intentarlo de nuevo");
        }
    }

    return (
        <div className="product-card" onClick={() => navigate(`/detalle/${sku}`)}>
            <img
                src={`http://localhost:3001/images/${sku}/${imgName}`}
                alt={nombre}
            />
            <FontAwesomeIcon
                icon="fa-heart"
                className={`favorite-icon ${isFav ? "active" : ""}`}
                onClick={(e) => {
                    e.stopPropagation();
                    addToFav(productId);
                }}
            />
            <div className="product-card-info">
                <h3>{nombre}</h3>
                <p className="price">${precio}</p>
                <button
                    type="button"
                    className="add-to-cart-btn"
                    value={productId}
                    onClick={(e) => {
                        e.stopPropagation(); 
                        addToCart(e)
                    }}
                >
                    <FontAwesomeIcon icon="fa-shopping-cart" /> Agregar
                </button>
            </div>
        </div>
    );

}

export default ProductCard