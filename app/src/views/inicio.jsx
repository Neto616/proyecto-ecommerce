import React from "react";
import { Link } from 'react-router-dom'; 
import "../style.css"; 
import ProductCard from "../components/presentacion_productos/ProductCard.jsx";


function Inicio() { 
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
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                </div>
            </section>
        </main>
        </>
    );
}

export default Inicio; // Si tu función es Index, deja export default Index;