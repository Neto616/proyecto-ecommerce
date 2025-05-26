import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IniciarSesion () {
    const navigate = useNavigate();
    const [datos, setDatos] = useState({ correo: "", contrasena: "" });
    
    const updateDatos = (e) => {
        const { name, value } = e.target;
        setDatos(prevDatos => ({...prevDatos, [name]: value}));
    }

    const iniciarSesion = async (e) => {
        e.preventDefault();
        try {
            const resultado = await fetch("http://localhost:3001/api/iniciar-sesion", {method: "POST", body: JSON.stringify(datos)});
            const data = await resultado.json();
            console.log(data)
            if(data.estatus === -1) return alert("El correo no es un correo");
            if(!data.estatus) return alert("Ha ocurrido algo favor de intentar de nuevo");
            if(data.estatus === 2) return alert("No existe el usuario");
            if(data.estatus === 3) return alert(data.result.info.includes("contraseña") ? "La contraseña debe tener minimo seis caracteres" : "Favor de llenar todos los campos")
            
            e.target.reset();
            alert(`Bienvenido ${data.result.nombre}`);
            navigate("/")
        } catch (error) {
            console.log("Ha ocurrido un error: ", error);
            alert("Ha ocurrido favor de intentar nuevamente");
        }
    }

    return(
        <div class="login-container">
            <h2>Iniciar Sesión</h2>
            <form class="login-form" onSubmit={e => iniciarSesion(e)}>
                <div class="input-group">
                    <input
                    onChange= {(e)=> updateDatos(e)}
                    type="email"
                    id="email"
                    name="correo"
                    placeholder="Correo Electrónico"
                    required
                    />
                </div>
                <div class="input-group">
                    <input
                    onChange= {(e)=> updateDatos(e)}
                    type="password"
                    id="password"
                    name="contrasena"
                    placeholder="Contraseña"
                    required
                    />
                    <FontAwesomeIcon icon="fas fa-eye" className="password-toggle"/>
                </div>
                <button type="submit" class="btn-primary">Entrar</button>
                <div class="links">
                    <span><Link to="/crear-cuenta">¿No tienes cuenta?</Link></span>
                </div>
            </form>
        </div>
    );
}

export default IniciarSesion;