import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductCard() {
    return (
        <div className="product-card">
            <img
            src="https://pm1.aminoapps.com/7976/5456503b36b384de7f9aede9d3a7dcab14dfd0f1r1-227-222v2_hq.jpg"
            alt="Producto 1"
            />
            <FontAwesomeIcon icon="fas fa-heart" className="favorite-icon"/>
            <div className="product-card-info">
                <h3>Nombre del Producto Ejemplo Largo</h3>
                <p className="price">$299.99</p>
                <button type="button" className="add-to-cart-btn">
                    <FontAwesomeIcon icon="fas fa-shopping-cart" /> Agregar
                </button>
            </div>
        </div>
    );
}

export default ProductCard