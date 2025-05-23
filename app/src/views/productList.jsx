import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "../components/presentacion_productos/ProductCard.jsx";

function CatalogoProductos () {
    return (
    <>
     <main className="main-content product-list-page">
        <h1>Todos Nuestros Productos</h1>

        <section className="filters-and-sort">
          <h3>Ordenar por:</h3>
          <div className="sort-options">
            <button type="button" className="sort-btn">
              Precio (Menor a Mayor) <FontAwesomeIcon icon="fa-solid fa-sort-amount-up" />
              {/* O usa: <i className="fas fa-sort-amount-up"></i> */}
            </button>
            <button type="button" className="sort-btn">
              Precio (Mayor a Menor) <FontAwesomeIcon icon="fa-solid fa-sort-amount-down" />
              {/* O usa: <i className="fas fa-sort-amount-down"></i> */}
            </button>
            <button type="button" className="sort-btn">
              Nombre (A-Z) <FontAwesomeIcon icon="fa-solid fa-sort-alpha-down" />
              {/* O usa: <i className="fas fa-sort-alpha-down"></i> */}
            </button>
            <button type="button" className="sort-btn">
              Nombre (Z-A) <FontAwesomeIcon icon="fa-solid fa-sort-alpha-up" />
              {/* O usa: <i className="fas fa-sort-alpha-up"></i> */}
            </button>
          </div>
        </section>

        <section className="product-grid-section">
          {/* No necesitamos el .map() de productos por ahora, solo la estructura */}
          <div className="product-grid">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>

          </div>
          {/* <p>No se encontraron productos con los filtros seleccionados.</p>  // Esto se mostraría condicionalmente con estado */}
        </section>
      </main>
    </>
    );
}

export default CatalogoProductos;