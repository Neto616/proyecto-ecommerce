import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; 
import "../style.css"; 
import ProductCard from "../components/presentacion_productos/ProductCard.jsx";


function Inicio() { 
    const [destacados, setDestacados] = useState([]);

    const getDestacados = async () => {
        try {
            const data = await fetch("http://localhost:3001/destacados", {method: "GET"})            ;
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
            <section className="hero-banner">
                <h1>Grandes Ofertas, Grandes Sonrisas</h1>
                <p>Descubre lo último en tecnología, moda y mucho más.</p>
                <Link to="/productos" className="btn-primary">Ver Productos</Link>
            </section>
            
            <section className="product-grid-section">
                <h2>Productos Destacados</h2>
                <div className="product-grid">
                    {destacados.length ? (destacados?.map((e, i) => <ProductCard key={i} nombre={e.nombre} precio={e.precio}  sku = {e.sku} imgName = {e.imagen}/>)) : null}
                </div>
            </section>
        </main>
        </>
    );
}

export default Inicio;