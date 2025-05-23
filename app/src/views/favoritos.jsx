import React from "react";
import ProductCard from "../components/presentacion_productos/ProductCard.jsx";

function Favoritos() {
    return (
    <main class="main-content">
        <section class="page-header">
            <h1>Mis Favoritos</h1>
        </section>
        
        <section class="favorites-grid product-grid">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
      </section>
    </main>
    );
}

export default Favoritos;