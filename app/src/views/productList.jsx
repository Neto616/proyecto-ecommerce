import React, {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProductCard from "../components/presentacion_productos/ProductCard.jsx";
import Paginacion from "../components/paginacion.jsx"

function CatalogoProductos () {
    let location = useLocation();
    const [productList, setProductList] = useState([]);
    const [paginacion, setPaginacion] = useState({});

    const getProductList = async (queryParam) => {
      try {
        const resultado = await fetch(`http://localhost:3001/productos${queryParam}`, {method: "GET"});
        const data = await resultado.json();
        console.log(data)
        if(data.estatus !== 1) return alert("Something is wrong");
        setProductList(data.result.data);
        setPaginacion({pagina_actual: data.result.pagina_actual, pagina_maxima: data.result.pagina_maxima})
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=> {
      const queryParams = new URLSearchParams(location.search);
      
      function createQuery (queries) {
        let final_query = "";
        queries.forEach(element => {
          const data = queryParams.get(element)
          if(data) {
            if(!final_query.length) final_query += `?${element}=${data}`
            else final_query += `&${element}=${data}`
          }
        });

        return final_query;
      }
      console.log(createQuery(["p", "section"]))
      getProductList(createQuery(["p", "section"]));
    }, [location])

    return (
    <>
     <main className="main-content product-list-page">
        <h1>Todos Nuestros Productos</h1>

        <section className="filters-and-sort">
          <h3>Ordenar por:</h3>
          <div className="sort-options">
            <button type="button" className="sort-btn">
              Precio (Menor a Mayor) <FontAwesomeIcon icon="fa-solid fa-sort-amount-up" />
            </button>
            <button type="button" className="sort-btn">
              Precio (Mayor a Menor) <FontAwesomeIcon icon="fa-solid fa-sort-amount-down" />
            </button>
            <button type="button" className="sort-btn">
              Nombre (A-Z) <FontAwesomeIcon icon="fa-solid fa-sort-alpha-down" />
            </button>
            <button type="button" className="sort-btn">
              Nombre (Z-A) <FontAwesomeIcon icon="fa-solid fa-sort-alpha-up" />
            </button>
          </div>
        </section>

        <section className="product-grid-section">
          <div className="product-grid">
            {productList.length ? (
              productList.map((e, i) => <ProductCard key = {i} nombre = {e.nombre} precio = {e.precio} sku = {e.sku} imgName = {e.imagen}/>)
            ): (<h1>Aun no hay productos pero lo invitamos a que siga con nosotros  proximamente habrá mas productos 😊</h1>)}
          </div>
          {/* <p>No se encontraron productos con los filtros seleccionados.</p>  // Esto se mostraría condicionalmente con estado */}
        </section>
        <Paginacion paginas={paginacion} location={location} />
      </main>
    </>
    );
}

export default CatalogoProductos;