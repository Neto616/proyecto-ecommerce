import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductItem from "../../components/presentacion_productos/ProductItem.jsx";
import Loading from "../../components/loader.jsx"
function Carrito () {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [carritoData, setCarritoData] = useState({});

    const getProductos = async () => {
        try {
            const resultado = await fetch("http://localhost:3001/api/carrito", {method: "GET"});
            const data = await resultado.json();
            console.log(data)
            if(data.estatus === -2) {
                navigate("/");
                return alert("Necesitas iniciar sesión para entrar a esta sección");
            }

            if(!data.estatus) {
                navigate("/");
                return alert("Ha sucedido algo favor de intentarlo de nuevo mas tarde");
            }

            setCarritoData(data.info.data);

        } catch (error) {
            console.log("Ha ocurrido un error en el carrito: ", error);
            alert("Ha ocurrido un error");
            return;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);

        getProductos();
    }, [])

    return (
        <>
        {loading ? (
              <div className="loader-overlay"><Loading/></div>) : (
        <main className="main-content">
            <section className="page-header">
                <h1>Carrito de Compras</h1>
            </section>
            <section className="cart-layout">
                <div className="cart-items">
                    {carritoData.length ? (carritoData.map((e, i) => <ProductItem productId={e.id} nombre={e.producto} precio={e.precio_formateado} precioTotal={e.precio_total_formateado} sku={e.sku} imgName={e.imagen} />)) : (<h3>Aun no tienes productos agregados</h3>)}
                </div>
                
                <div className="cart-summary">
                    <h2>Resumen del Carrito</h2>
                    <div className="summary-line">
                        <span>Subtotal:</span>
                        <span id="subtotal">${carritoData[0].total_pagar ?? 0.00}</span>
                    </div>
                    {/* <div className="summary-line">
                        <span>Envío:</span>
                        <span id="shipping">$15.00</span>
                    </div> */}
                    <div className="summary-line total">
                        <span>Total:</span>
                        <span id="grand-total">${carritoData[0].total_pagar ?? 0.00}</span>
                    </div>
                    <button type="button" className="btn-primary checkout-btn">Proceder al Pago</button>
                    <Link to="/productos" className="continue-shopping-link">Continuar Comprando</Link>
                </div>
            </section>
        </main>)}
    </>
    );
}

export default Carrito;