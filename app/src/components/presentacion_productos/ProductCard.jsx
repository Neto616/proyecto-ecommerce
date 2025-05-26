import React from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductCard({ productId, nombre, precio, sku, imgName, isFav }) {
    const navigate = useNavigate();

    const addToFav = async (producto) => {
        try {
            const result = await fetch("http://localhost:3001/api/add_fav", {method: "POST", body: JSON.stringify({producto: producto})});
            const data = await result.json();
            console.log(data)
            if(data.estatus === -2) return alert("Para añadir un producto a favoritos necesita iniciar sesión");
            if(data.estatus == 1) return alert(!data.info.message.includes("desmarcado") ? "Producto añadido a su lista de favoritos" 
                                                                                        : "Producto eliminado de su lista de favoritos");
            return alert("Favor de intentarlo de nuevo más tarde")
            
        } catch (error) {
            console.log("Ha ocurrido un error favor de intentarlo luego");
            alert("Favor de intentarlo de nuevo")
        }    
    }

    return (
        <div className="product-card" >
            <img
            src={"http://localhost:3001/images/"+sku+"/"+imgName}
            alt={nombre}
            />
            <FontAwesomeIcon icon="fa-heart" className={`favorite-icon ${isFav ? "active" : ""}`} onClick={()=> addToFav(productId)}/>
            <div className="product-card-info" >
                <h3 onClick={()=> navigate(`/detalle/${sku}`)}>{nombre}</h3>
                <p className="price">${precio}</p>
                <button type="button" className="add-to-cart-btn">
                    <FontAwesomeIcon icon="fa-shopping-cart" /> Agregar
                </button>
            </div>
        </div>
    );
}

export default ProductCard