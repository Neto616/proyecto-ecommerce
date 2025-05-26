import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

function MiCuenta () {
    return (
    <>
    <main className="main-content">
        <div className="account-container">
            <aside className="account-sidebar">
                <ul className="account-menu">
                    <li>
                        <a href="#profile" id="profile-link" className="active">
                            <FontAwesomeIcon icon="fas fa-user"/>
                             Mi Perfil
                        </a>
                    </li>
                    <li>
                        <a href="#orders" id="orders-link">
                            <FontAwesomeIcon icon="fas fa-box"/>
                        Mis Pedidos</a>
                    </li>
                    <li>
                        <a href="#addresses" id="addresses-link">
                            <FontAwesomeIcon icon="fas fa-map-marker-alt"/>
                        Mis Direcciones</a>
                    </li>
                    <li>
                        <a href="#favorites" id="favorites-link">
                            <FontAwesomeIcon icon="fas fa-heart"/>
                            Mis Favoritos</a>
                    </li>
                    <li>
                        <a href="#payments" id="payments-link">
                            <FontAwesomeIcon icon="fas fa-credit-card"/>
                            Métodos de Pago</a> 
                    </li>
                    <li>
                        <a href="login.html">
                            <FontAwesomeIcon icon="fas fa-sign-out-alt"/>
                            Cerrar Sesión</a>
                    </li>
                </ul>
            </aside>
            <section className="account-content">
                <div id="profile" className="account-section active-section">
                    <h3>Mi Perfil</h3>
                    <form>
                        <div className="input-group">
                            <label for="acc-name">Nombre(s):</label>
                            <input type="text" id="acc-name" value="Juan" />
                        </div>
                        <div className="input-group">
                            <label for="acc-lastname">Apellidos:</label>
                            <input type="text" id="acc-lastname" value="Pérez García" />
                        </div>
                        <div className="input-group">
                            <label for="acc-email">Correo Electrónico:</label>
                            <input
                            type="email"
                            id="acc-email"
                            value="juan.perez@ejemplo.com"
                            />
                        </div>
                        <div className="input-group">
                            <label for="acc-whatsapp">WhatsApp:</label>
                            <input type="text" id="acc-whatsapp" value="+52 123 456 7890" />
                        </div>
                        <button type="submit" className="btn-primary">Guardar Cambios</button>
                    </form>
                </div>
        <div id="orders" className="account-section">
            <h3>Mis Pedidos</h3>
            <div className="order-item">
              <h4>Pedido #12345 - 2024-05-20</h4>
              <p>Total: $550.00</p>
              <p>Estado: **Enviado**</p>
              <p><a href="#">Ver Detalles del Pedido</a></p>
            </div>
            <div className="order-item">
              <h4>Pedido #12344 - 2024-05-15</h4>
              <p>Total: $120.50</p>
              <p>Estado: **Entregado**</p>
              <p><a href="#">Ver Detalles del Pedido</a></p>
            </div>
          </div>

        <div id="addresses" className="account-section">
            <h3>Mis Direcciones</h3>
            <div className="address-item">
              <p><strong>Dirección Principal:</strong></p>
              <p>Calle Falsa 123, Colonia Centro</p>
              <p>Ciudad de México, CP 01234</p>
              <div className="address-actions">
                <button type="button">Editar</button>
                <button type="button">Eliminar</button>
              </div>
            </div>
            <button type="button" className="btn-primary">Agregar Nueva Dirección</button>
          </div>

        <div id="favorites" className="account-section">
            <h3>Mis Favoritos</h3>
            <div className="product-grid">
              <div className="product-card">
                <img
                  src="https://via.placeholder.com/250x200?text=Favorito+1"
                  alt="Laptop Ultrabook"
                />
                <i className="fas fa-heart favorite-icon active"></i>
                <div className="product-card-info">
                  <h3>Laptop Ultrabook</h3>
                  <p className="price">$1200.00</p>
                  <button type="button" className="add-to-cart-btn">
                    <i className="fas fa-shopping-cart"></i> Agregar
                  </button>
                </div>
              </div>
              <div className="product-card">
                <img
                  src="https://via.placeholder.com/250x200?text=Favorito+2"
                  alt="Auriculares Bluetooth"
                />
                <i className="fas fa-heart favorite-icon active"></i>
                <div className="product-card-info">
                  <h3>Auriculares Bluetooth</h3>
                  <p className="price">$75.00</p>
                  <button type="button" className="add-to-cart-btn">
                    <i className="fas fa-shopping-cart"></i> Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>

        <div id="payments" className="account-section">
            <h3>Métodos de Pago</h3>
            <p>
              Aquí se mostrarán tus métodos de pago guardados (ej. tarjetas de
              crédito/débito).
            </p>
            <p>Actualmente no hay métodos de pago registrados.</p>
            <button type="button" className="btn-primary">Agregar Método de Pago</button>
          </div>
        </section>
      </div>
    </main>
        </>
    );
}

export default MiCuenta;