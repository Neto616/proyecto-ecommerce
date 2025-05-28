import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductItem({ productId, nombre, precio, precioTotal, sku, imgName }) {
    return (
        <div className="cart-item">
                            <img
                                src={"http://localhost:3001/images/"+sku+"/"+imgName}
                                alt="Producto A"
                            />
                            <div className="item-details">
                                <h3>{nombre}</h3>
                                <p className="item-price">${precio}</p>
                                
                                <div className="quantity-selector">
                                    <button type="button" className="decrement-qty">-</button>
                                    <input
                                    type="number"
                                    value="1"
                                    min="1"
                                    className="item-quantity"
                                    data-price="120.00"
                                    />
                                    <button type="button" className="increment-qty">+</button>
                                </div>
                            </div>
                    <div className="item-actions">
                        <p className="item-total">${precioTotal}</p>
                        <button type="button" className="remove-item-btn">
                            <FontAwesomeIcon icon="fas fa-trash-alt"/> Eliminar
                        </button>
                    </div>
                </div>
    );
}

export default ProductItem;