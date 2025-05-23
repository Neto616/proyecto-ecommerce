import React from "react"
import ProductCard from "../components/presentacion_productos/ProductCard.jsx";

function DetalleProductos () {
    return (
        <main class="main-content">
            <div class="product-detail-container">
                <div class="product-gallery">
                    <div class="main-image">
                        <img
                        src="https://pm1.aminoapps.com/7976/5456503b36b384de7f9aede9d3a7dcab14dfd0f1r1-227-222v2_hq.jpg"
                        alt="Producto Principal"
                        />
                    </div>
                    <div class="thumbnails">
                        <img
                        src="https://pm1.aminoapps.com/7976/5456503b36b384de7f9aede9d3a7dcab14dfd0f1r1-227-222v2_hq.jpg"
                        alt="Vista 1"
                        class="active"
                        />
                        <img
                        src="https://pm1.aminoapps.com/7976/5456503b36b384de7f9aede9d3a7dcab14dfd0f1r1-227-222v2_hq.jpg"
                        alt="Vista 2"
                        />
                        <img
                        src="https://pm1.aminoapps.com/7976/5456503b36b384de7f9aede9d3a7dcab14dfd0f1r1-227-222v2_hq.jpg"
                        alt="Vista 3"
                        />
                        <img
                        src="https://pm1.aminoapps.com/7976/5456503b36b384de7f9aede9d3a7dcab14dfd0f1r1-227-222v2_hq.jpg"
                        alt="Vista 4"
                        />
                    </div>
                </div>
        <div class="product-info">
          <h1>Nombre del Producto Increíble y Novedoso</h1>
          <p class="price">$499.99</p>
          <p class="description">
            Este es un producto fantástico con características increíbles.
            Perfecto para todas tus necesidades, diseñado con los mejores
            materiales para garantizar durabilidad y rendimiento. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>

          <div class="product-options">
            <label for="color">Color:</label>
            <select id="color">
              <option value="rojo">Rojo</option>
              <option value="azul">Azul</option>
              <option value="verde">Verde</option>
            </select>

            <label for="size">Talla/Tamaño:</label>
            <select id="size">
              <option value="s">Pequeño</option>
              <option value="m">Mediano</option>
              <option value="l">Grande</option>
            </select>

            <label for="quantity">Cantidad:</label>
            <div class="quantity-selector">
              <button type="button" id="decrement-qty">-</button>
              <input type="number" id="quantity" value="1" min="1" max="10" />
              <button type="button" id="increment-qty">+</button>
            </div>
          </div>

          <div class="action-buttons">
            <button type="button" class="btn-primary">
              <i class="fas fa-shopping-cart"></i> Agregar al Carrito
            </button>
            <button type="button" class="btn-favorite">
              <i class="far fa-heart"></i> Añadir a Favoritos
            </button>
          </div>

          <div class="additional-info">
            <h3>Características Técnicas</h3>
            <ul>
              <li>Material: Plástico ABS de alta resistencia</li>
              <li>Dimensiones: 10x15x5 cm</li>
              <li>Peso: 200g</li>
              <li>Garantía: 1 año</li>
            </ul>
            <h3>Opiniones de Clientes</h3>
            <p>¡Excelente producto, muy satisfecho! - Juan Pérez</p>
            <p>Lo recomiendo ampliamente. - María García</p>
          </div>
        </div>
      </div>

      <section class="related-products">
        <h2>Productos Relacionados</h2>
        <div class="product-grid">
            <ProductCard/>
            <ProductCard/>
        </div>
      </section>
    </main>
    );
}

export default DetalleProductos;