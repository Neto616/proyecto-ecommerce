import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductItem() {
    return (
        <div className="cart-item">
                            <img
                                src="https://pm1.aminoapps.com/7976/5456503b36b384de7f9aede9d3a7dcab14dfd0f1r1-227-222v2_hq.jpg"
                                alt="Producto A"
                            />
                            <div className="item-details">
                                <h3>Nombre del Producto A Muy Largo para Prueba</h3>
                                <p className="item-price">$120.00</p>
                                
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
                        <p className="item-total">$120.00</p>
                        <button type="button" className="remove-item-btn">
                            <FontAwesomeIcon icon="fas fa-trash-alt"/> Eliminar
                        </button>
                    </div>
                </div>
    );
}

export default ProductItem;