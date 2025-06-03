import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import eventBus from "../../utils/eventBus.js";

function ProductItem({ productId, productQuantity, nombre, precio, precioTotal, sku, imgName, getProductos }) {
    const navigate = useNavigate();

    const removeFromCart = async (e, idProduct) => {
        try {
            console.log(idProduct);
            const peticion = await fetch(`http://localhost:3001/api/carrito/${idProduct}`, {method: "DELETE"});
            const data = await peticion.json();
            console.log("Datos: ", data);

            if(data.estatus === -2) {
                alert("Necesitar iniciar sesión para poder eliminar productos del carrito");
                navigate("/");
                return;
            }
            if(data.estatus === 0) return alert("Ha ocurrido algo favor de intentar de nuevo");
            eventBus.emit('cartUpdated');
            alert("Se ha eliminado el producto de tu carrito");
            getProductos()
            return
        } catch (error) {
            console.log("Ha ocurrido un error: ", error);
            alert("Ha ocurrido un error favor de intentarlo de nuevo");
        }
    }


    return (
        <div className="cart-item">
                            <img
                                src={"http://localhost:3001/images/"+sku+"/"+imgName}
                                alt={nombre}
                            />
                            <div className="item-details">
                                <h3>{nombre}</h3>
                                <p className="item-price">${precio}</p>
                                
                                <div className="quantity-selector">
                                    <input
                                    type="number"
                                    value={productQuantity}
                                    min="1"
                                    className="item-quantity"
                                    />
                                </div>
                            </div>
                    <div className="item-actions">
                        <p className="item-total">${precioTotal}</p>
                        <button type="button" className="remove-item-btn" onClick={(e) => removeFromCart(e, productId) }>
                            <FontAwesomeIcon icon="fas fa-trash-alt"/> Eliminar
                        </button>
                    </div>
                </div>
    );
}

export default ProductItem;