import React from "react";
import { Link } from "react-router-dom";
import ProductItem from "../components/presentacion_productos/ProductItem.jsx";

function Carrito () {
    return (
        <>
        <main className="main-content">
            <section className="page-header">
                <h1>Carrito de Compras</h1>
            </section>
        <section className="cart-layout">
            <div className="cart-items">
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
            </div>

            <div className="cart-summary">
                <h2>Resumen del Carrito</h2>
                    <div className="summary-line">
                        <span>Subtotal:</span>
                        <span id="subtotal">$211.00</span>
                    </div>
                <div className="summary-line">
                    <span>Envío:</span>
                    <span id="shipping">$15.00</span>
                </div>
                <div className="summary-line total">
                    <span>Total:</span>
                    <span id="grand-total">$226.00</span>
                </div>
                <button type="button" className="btn-primary checkout-btn">Proceder al Pago</button>
                <Link to="/productos" className="continue-shopping-link">Continuar Comprando</Link>
            </div>
        </section>
    </main>
    </>
    );
}

export default Carrito;