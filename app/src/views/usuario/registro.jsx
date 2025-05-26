import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Asegúrate de importar esto

function Registro() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        nombre:              "",
        apellidos:           "",
        correo:              "",
        contrasena:          "",
        confirmarContrasena: ""
    });

    const crearCuenta = async (e) => {
        try {
            e.preventDefault();
            console.log("DATA ES: ", data)
            const resultado = await fetch("http://localhost:3001/api/crear-usuario", {method: "POST", body: JSON.stringify(data)});
            const datos = await resultado.json();
            if(!datos.estatus) return alert("Favor de intentarlo nuevamente");
            if(datos.estatus === 2) return alert("Las contraseñas deben ser iguales");
            if(datos.estatus === 3) return alert(datos.result.info.includes("contraseña") ? "La contraseña debe ser mayor de seis digitos" : "Favor de llenar todos los datos");
            if(datos.estatus === -1) return alert("El correo no tiene el formato correcto");

            e.target.reset();
            alert("Se ha creado el usuario con exito");
            navigate("/iniciar-sesion");
        } catch (error) {
            console.log("Ha ocrrido un error: ", error);
        }
    }

    const updateData =  (e) => {
        const {name, value} = e.target;
        setData(prevData => ({...prevData, [name]: value}))        
    }
    
    return (
        <main className="registro-page">
            <div className="registro-container">
                <h2>Crear Cuenta</h2>

                <form className="registro-form" onSubmit= {(e)=> crearCuenta(e)}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        {/* NUEVO: Contenedor para el input y el icono */}
                        <div className="input-with-icon">
                            <input
                                onChange = {(e)=> updateData(e)}
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Tu nombre"
                                // className={errors.nombre ? 'input-error' : ''}
                            />
                            <FontAwesomeIcon icon="fa-solid fa-user" className="input-icon" />
                        </div>
                        {/* <span className="error-text">El nombre es obligatorio.</span> */}
                    </div>

                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos:</label>
                        <div className="input-with-icon">
                            <input
                                onChange = {(e)=> updateData(e)}
                                type="text"
                                id="apellidos"
                                name="apellidos"
                                placeholder="Tus apellidos"
                                // className={errors.apellidos ? 'input-error' : ''}
                            />
                            <FontAwesomeIcon icon="fa-solid fa-user" className="input-icon" />
                        </div>
                        {/* <span className="error-text">Los apellidos son obligatorios.</span> */}
                    </div>

                    <div className="form-group">
                        <label htmlFor="correo">Correo Electrónico:</label>
                        <div className="input-with-icon">
                            <input
                                onChange = {(e)=> updateData(e)}
                                type="email"
                                id="correo"
                                name="correo"
                                placeholder="ejemplo@dominio.com"
                                // className={errors.correo ? 'input-error' : ''}
                            />
                            <FontAwesomeIcon icon="fa-solid fa-envelope" className="input-icon" />
                        </div>
                        {/* <span className="error-text">El correo no es válido.</span> */}
                    </div>

                    <div className="form-group">
                        <label htmlFor="contrasena">Contraseña:</label>
                        <div className="input-with-icon">
                            <input
                                onChange = {(e)=> updateData(e)}
                                type="password"
                                id="contrasena"
                                name="contrasena"
                                placeholder="Mínimo 6 caracteres"
                                // className={errors.contrasena ? 'input-error' : ''}
                            />
                            <FontAwesomeIcon icon="fa-solid fa-lock" className="input-icon" />
                        </div>
                        {/* <span className="error-text">La contraseña es obligatoria.</span> */}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmarContrasena">Confirmar Contraseña:</label>
                        <div className="input-with-icon">
                            <input
                                onChange = {(e)=> updateData(e)}
                                type="password"
                                id="confirmarContrasena"
                                name="confirmarContrasena"
                                placeholder="Repite tu contraseña"
                                // className={errors.confirmarContrasena ? 'input-error' : ''}
                            />
                            <FontAwesomeIcon icon="fa-solid fa-lock" className="input-icon" />
                        </div>
                        {/* <span className="error-text">Las contraseñas no coinciden.</span> */}
                    </div>

                    <button type="submit" className="btn-primary">Registrarse</button>
                </form>

                <p className="login-link">
                    ¿Ya tienes una cuenta? <Link to="/iniciar-sesion">Inicia Sesión aquí</Link>
                </p>
            </div>
        </main>
    );
}

export default Registro;