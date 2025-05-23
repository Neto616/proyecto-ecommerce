import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IniciarSesion () {
    return(
        <div class="login-container">
            <h2>Iniciar Sesión</h2>
            <form class="login-form">
                <div class="input-group">
                    <input
                    type="email"
                    id="email"
                    placeholder="Correo Electrónico"
                    required
                    />
                </div>
                <div class="input-group">
                    <input
                    type="password"
                    id="password"
                    placeholder="Contraseña"
                    required
                    />
                    <FontAwesomeIcon icon="fas fa-eye" className="password-toggle"/>
                </div>
                <button type="submit" class="btn-primary">Entrar</button>
                <div class="links">
                    <a href="#">¿Olvidaste tu contraseña?</a>
                    <span>¿No tienes cuenta?
                        <a href="register.html">Regístrate aquí.</a></span>
                </div>
            </form>
        </div>
    );
}

export default IniciarSesion;