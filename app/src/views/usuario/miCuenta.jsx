import React, { useEffect, useState } from "react";
import { data, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

function MiCuenta () {
    const navigate = useNavigate();
    const [section, setSection] = useState("profile");
    const [userData, setUserData] = useState({ nombre: "", apellidos: "", correo: "", wpp: ""});
    const [orders, setOrders] = useState([]);

    const changeValue = (e) => {
      const { name, value } = e.target;
      setUserData((prev)=> ({ ...prev, [name]: value}));
    }

    const updateUserData = async (e) => {
      try {
        e.preventDefault();
        console.log(userData);
        const peticion = await fetch("http://localhost:3001/api/actualizar-usuario", {method: "PUT", body: JSON.stringify(userData)});
        const resultado = await peticion.json();
        console.log(resultado);
        if(resultado.estatus === 0 || resultado.estatus === -2) {
          alert("Debes iniciar sesión para poder actualizar tus datos");
          return navigate("/iniciar-sesion");
        }

        alert("Se han actualizado los datos del usuario");
      } catch (error) {
        console.error("Ha ocurrido un error al actualizar usuario: ", error);
        // window.location.reload();
      }
    }

    const getUserData = async () => {
      try {
        const peticion = await fetch("http://localhost:3001/api/user_info", {method: "GET", headers: { "Content-Type": "application/json" }})
        const resultado = await peticion.json();
        console.log(resultado)
        if(!resultado.estatus || resultado.estatus == -2){
          alert("Necesitas iniciar sesión para entrar a esta sección");
          return navigate("/iniciar-sesion")
        }
        setUserData(resultado.result.data[0]);
      } catch (error) {
        console.error("Ha ocurrido un problema al obtener los datos del usuario: ", error);
        setUserData({ nombre: "", apellido: "", correo: "", wpp: ""})
      }
    }

    const getOrders = async () => {
      try {
        const peticion = await fetch("http://localhost:3001/api/user_orders", {method: "GET", headers: {"Content-Type": "application/json"}});
        const resultado = await peticion.json();
        console.log("Pedidos: ", resultado)
         if(!resultado.estatus || resultado.estatus == -2){
          alert("Necesitas iniciar sesión para entrar a esta sección");
          return navigate("/iniciar-sesion")
        }
        setOrders(resultado.info.data.pedidos)
      } catch (error) {
        console.error("Ha ocurrido un error obteniendo los pedidos del usuario: ", error);

      }
    }

    useEffect(()=>{
      if(section === "profile") getUserData();
      if(section === "orders") getOrders();
      else console.log("c papu")
    }, [section])

    return (
    <>
    <main className="main-content">
        <div className="account-container">
            <aside className="account-sidebar">
                <ul className="account-menu">
                    <li>
                        <a onClick={()=> setSection("profile")} id="profile-link" className={section === "profile" ? "active" : ""}>
                            <FontAwesomeIcon icon="fas fa-user"/>
                             Mi Perfil
                        </a>
                    </li>
                    <li>
                        <a onClick={()=> setSection("orders")} id="orders-link" className={section === "orders" ? "active" : ""}>
                            <FontAwesomeIcon icon="fas fa-box"/>
                        Mis Pedidos</a>
                    </li>
                    <li>
                        <a onClick={()=> window.location.href = "/api/cerrar-sesion"}>
                            <FontAwesomeIcon icon="fas fa-sign-out-alt"/>
                            Cerrar Sesión</a>
                    </li>
                </ul>
            </aside>
            <section className="account-content">
                <div id="profile" className={`account-section ${section == "profile" ? "active-section": ""}`}>
                    <h3>Mi Perfil</h3>
                    <form onSubmit={(e)=> updateUserData(e)}>
                        <div className="input-group">
                            <label for="nombre">Nombre(s):</label>
                            <input type="text" id="nombre" onChange={changeValue}
                            name="nombre" value={userData?.nombre || ""} />
                        </div>
                        <div className="input-group">
                            <label for="apellidos">Apellidos:</label>
                            <input type="text" id="apellidos" name="apellidos" onChange={changeValue}
                            value={userData?.apellidos || ""} />
                        </div>
                        <div className="input-group">
                            <label for="correo">Correo Electrónico:</label>
                            <input
                            type="email"
                            id="correo"
                            name="correo"
                          //  onChange={changeValue}
                            value={userData?.correo || ""}
                            />
                        </div>
                        <div className="input-group">
                            <label for="wpp">WhatsApp:</label>
                            <input type="text" id="wpp" onChange={changeValue}
                            name="wpp" value={userData?.wpp || ""} />
                        </div>
                        <button type="submit" className="btn-primary">Guardar Cambios</button>
                    </form>
                </div>
                <div id="orders" className={`account-section ${section == "orders" ? "active-section": ""}`}>
                  <h3>Mis Pedidos</h3>
                  {orders.length ? (
                    orders.map((e, i) => { return (
                      <div key={i} className="order-item">
                        <h4>Pedido #{e.id} - {e.fecha_cierre_pedido}</h4>
                        <p>Total: ${e.precio_total}</p>
                        <p>Estado: Finalizado</p>
                        {/* <p><a href="#">Ver Detalles del Pedido</a></p> */}
                      </div>
                    )})
                      ) : (<h4>Aun no has realizado un pedido 😪</h4>)}


                  </div>
       </section>
      </div>
    </main>
        </>
    );
}

export default MiCuenta;