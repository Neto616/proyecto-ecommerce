import React from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductCard({ nombre, precio, sku, imgName }) {
    const navigate = useNavigate();
    return (
        <div className="product-card" onClick={()=> navigate(`/detalle/${sku}`)}>
            <img
            src={"http://localhost:3001/"+sku+"/"+imgName}
            alt={nombre}
            />
            <FontAwesomeIcon icon="fa-heart" className="favorite-icon"/>
            <div className="product-card-info" >
                <h3>{nombre}</h3>
                <p className="price">${precio}</p>
                <button type="button" className="add-to-cart-btn">
                    <FontAwesomeIcon icon="fa-shopping-cart" /> Agregar
                </button>
            </div>
        </div>
    );
}

export default ProductCard