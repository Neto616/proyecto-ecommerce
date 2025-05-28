import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; 
import "../style.css"; 
import ProductCard from "../components/presentacion_productos/ProductCard.jsx";
import Banner from "../icons/Banner.png";

function Inicio() { 
    const [destacados, setDestacados] = useState([]);

    const getDestacados = async () => {
        try {
            const data = await fetch("http://localhost:3001/api/destacados", {method: "GET"})            ;
            const resultado = await data.json();
            console.log("Los objetos destacados son: ", resultado.info.data);
            setDestacados(resultado.info.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDestacados();
    }, [])

    return (
        <>
        <main className="main-content">
            <Link to="/productos" className="hero-banner-link">
                <img 
                    src={Banner} 
                    alt="Grandes Ofertas, Grandes Sonrisas" 
                    className="hero-banner-image"
                />
            </Link>

            <section className="product-grid-section">
                <h2>Productos Destacados</h2>
                <div className="product-grid">
                    {destacados.length ? (destacados?.map((e, i) => <ProductCard key={i} productId={e.id} nombre={e.nombre} precio={e.precio_format}  sku = {e.sku} imgName = {e.imagen} isFav={""} />)) : null}
                </div>
            </section>
        </main>
        </>
    );
}

export default Inicio;