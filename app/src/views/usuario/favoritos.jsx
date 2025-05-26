import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Paginacion from "../../components/paginacion.jsx"
import ProductCard from "../../components/presentacion_productos/ProductCard.jsx";

function Favoritos() {
    const navigate = useNavigate();
    const location = useLocation();
    const [productos, setProductos] = useState([]);
    const [paginacion, setPaginacion] = useState({});

    const getFavorites = async () => {
        try {
            const resultado = await fetch("http://localhost:3001/api/favoritos", {method: "GET"});
            const data = await resultado.json();
            console.log(data)
            if(data.estatus == -2) {
                alert("Para poder entrar a esta sección necesitas iniciar sesión");
                return navigate("/")
            }
            if(data.estatus == 0) return alert("Ha sucedido un error favor de intentarlo de nuevo mas tarde");
            setProductos(data.info.data.productos)
            setPaginacion({pagina_actual: data.info.data.pagina_actual, pagina_maxima: data.info.data.pagina_maxima ?? 1})
        } catch (error) {
            console.log("Ha ocurrido un error al entrar a favoritos: ", error);
            return navigate("/");        
        }
    }

    useEffect(() => {
        getFavorites();
    }, [])
    return (
    <main class="main-content">
        <section class="page-header">
            <h1>Mis Favoritos</h1>
        </section>
        
        <section class="favorites-grid product-grid">
            {productos?.length ? (productos.map((e, i) => <ProductCard key = {i} productId={e.id} nombre={e.nombre} precio={e.precio} sku={e.sku} imgName={e.imagen} isFav = {"true"} />)
            ) : <div><h3>Aun no tienes productos favoritos te invitamos a que veas nuestros catalogos para que encuentres el producto ideal para ti</h3></div>}
      </section>
      <Paginacion paginas={paginacion} location={location} />
    </main>
    );
}

export default Favoritos;