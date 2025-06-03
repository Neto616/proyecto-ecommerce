import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductItem from "../../components/presentacion_productos/ProductItem.jsx";
import Loading from "../../components/loader.jsx"
import eventBus from "../../utils/eventBus.js";
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

    const finalizarPedido = async () => {
        try {
            const peticion = await fetch("http://localhost:3001/api/finalizar_pedido", {method: "PUT", headers: {"Content-Type": "applicatio/json"}});
            const resultado = await peticion.json();

            if(resultado.estatus === -1) return alert("Para cerrar pedido requieres tener una sesión nueva");
            if(resultado.estatus === 0) return alert("Algo ha ocurrido favor de intentarlo nuevamente");
            eventBus.emit("cartUpdated");
            alert("Muchas gracias por finalizar la compra le agradecemos su confianza");
            return navigate("/");

        } catch (error) {
            console.error("Ha ocurrido un error al finalizar un pedido: ", error);
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
                    {carritoData.length ? (carritoData.map((e, i) => <ProductItem key={i} productQuantity={e.cantidad} productId={e.id_producto} nombre={e.producto} precio={e.precio_formateado} precioTotal={e.precio_total_formateado} sku={e.sku} imgName={e.imagen} getProductos={getProductos} />)) : (<h3>Aun no tienes productos agregados</h3>)}
                </div>
                
                <div className="cart-summary">
                    <h2>Resumen del Carrito</h2>
                    <div className="summary-line">
                        <span>Subtotal:</span>
                        <span id="subtotal">${carritoData[0]?.total_pagar || "0.00"}</span>
                    </div>
                    {/* <div className="summary-line">
                        <span>Envío:</span>
                        <span id="shipping">$15.00</span>
                    </div> */}
                    <div className="summary-line total">
                        <span>Total:</span>
                        <span id="grand-total">${carritoData[0]?.total_pagar || "0.00"}</span>
                    </div>
                    <button type="button" className="btn-primary checkout-btn" onClick={(e)=>{setLoading(true); finalizarPedido();}}>Proceder al Pago</button>
                    <Link to="/productos" className="continue-shopping-link">Continuar Comprando</Link>
                </div>
            </section>
        </main>)}
    </>
    );
}

export default Carrito;