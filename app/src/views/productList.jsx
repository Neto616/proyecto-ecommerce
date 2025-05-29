import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProductCard from "../components/presentacion_productos/ProductCard.jsx";
import Paginacion from "../components/paginacion.jsx";
import Loading from "../components/loader.jsx";

function CatalogoProductos () {
    let location = useLocation();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [productList, setProductList] = useState([]);
    const [paginacion, setPaginacion] = useState({});

    const getProductList = async (queryParam) => {
      try {
        const resultado = await fetch(`http://localhost:3001/api/productos${queryParam}`, {method: "GET"});
        const data = await resultado.json();
        if(data.estatus !== 1) return alert("Something is wrong");
        setProductList(data.result.data);
        setPaginacion({pagina_actual: data.result.pagina_actual, pagina_maxima: data.result.pagina_maxima})
      } catch (error) {
        console.log(error);
      }finally {
        setLoader(false);
      }
    }

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

    function addFilter (filter) {
      const regex = /[?&= ]+/g
      let jsonRequest = {}
      let splitted = location.search.split(regex);
      splitted.shift()
      
      for (let i = 0; i < splitted.length; i += 2) {
        let number = i;
        console.log(splitted[i]+"= "+splitted[i+1])
        jsonRequest[splitted[i]] = splitted[i+1];
      }

      jsonRequest["filtro"] = filter
        
      let searchQuery = "";
      for (const element in jsonRequest) {
        if (Object.prototype.hasOwnProperty.call(jsonRequest, element)) {
          if(searchQuery.length) searchQuery += `&${element}=${jsonRequest[element]}`
          else searchQuery += `?${element}=${jsonRequest[element]}`
        }
      }
      navigate(`${location.pathname}${searchQuery}`);
    }

    useEffect(()=> {
      setLoader(true);
      getProductList(createQuery(["p", "section", "filtro"]));
    }, [location])

    return (
    <>
    {loader ? (
      <div className="loader-overlay"><Loading/></div>) : (
      <main className="main-content product-list-page">
          <h1>Todos Nuestros Productos</h1>

          <section className="filters-and-sort">
            <h3>Ordenar por:</h3>
            <div className="sort-options">
              <button type="button" value = {1} className="sort-btn" onClick={(e)=> addFilter (e.target.value)}>
                Precio (Menor a Mayor) <FontAwesomeIcon icon="fa-solid fa-sort-amount-up"  />
              </button>
              <button type="button" value = {2} className="sort-btn" onClick={(e)=> addFilter (e.target.value)}v>
                Precio (Mayor a Menor) <FontAwesomeIcon icon="fa-solid fa-sort-amount-down" />
              </button>
              <button type="button" value = {3} className="sort-btn" onClick={(e)=> addFilter (e.target.value)}>
                Nombre (A-Z) <FontAwesomeIcon icon="fa-solid fa-sort-alpha-down" />
              </button>
              <button type="button" value = {4} className="sort-btn" onClick={(e)=> addFilter (e.target.value)}>
                Nombre (Z-A) <FontAwesomeIcon icon="fa-solid fa-sort-alpha-up" />
              </button>
            </div>
          </section>

          <section className="product-grid-section">
            <div className="product-grid">
              {productList.length ? (
                productList.map((e, i) => <ProductCard key = {i} productId = {e.id} nombre = {e.nombre} precio = {e.precio_format} sku = {e.sku} imgName = {e.imagen} isFav={""}/>)
              ): (<h1>Aun no hay productos pero lo invitamos a que siga con nosotros  proximamente habrá mas productos 😊</h1>)}
            </div>
            {/* <p>No se encontraron productos con los filtros seleccionados.</p>  // Esto se mostraría condicionalmente con estado */}
          </section>
          <Paginacion paginas={paginacion} location={location} />
        </main>
      )}
    </>
    );
}

export default CatalogoProductos;