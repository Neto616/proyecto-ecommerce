import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Paginacion({ paginas, location  }){
    const navigate = useNavigate();
    const [numberButtons, setNumberButtons] = useState([]);

    const changePage = async (numberOfPage) => {
        const regex = /[?&= ]+/g
        let jsonRequest = {}
        let splitted = location.search.split(regex);
        splitted.shift()

        for (let i = 0; i < splitted.length; i += 2) {
            let number = i;
            console.log(splitted[i]+"= "+splitted[i+1])
            jsonRequest[splitted[i]] = splitted[i+1];
        }

        jsonRequest["p"] = numberOfPage
        
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
        function createPages (showingSpaces, intervalButton) {
        let interval = [];
        let pagina = 0;

        if(paginas.pagina_actual > intervalButton && paginas.pagina_actual >= (paginas.pagina_maxima - intervalButton)){
            for (let i = paginas.pagina_actual-intervalButton*2; i <= (paginas.pagina_actual); i++) {
                interval.push(i); 
            }
        }
        else if(paginas.pagina_actual > intervalButton && paginas.pagina_actual <= (paginas.pagina_maxima - intervalButton)) {
            for (let i = paginas.pagina_actual-intervalButton; i <= (paginas.pagina_actual+intervalButton); i++) {
                interval.push(i);
            }
        }
        else if(paginas.pagina_maxima <= showingSpaces){
            for(let i = 1; i<=paginas.pagina_maxima; i++){
                interval.push(i);
            }
        }
        else {
            for(let i = 1; i<=showingSpaces; i++){
                interval.push(i);
            }
        }

        setNumberButtons(interval)
}
        
        createPages(3, 1);
    }, [paginas])

    return(
        <div className="pagination-container">
            <button className="pagination-btn prev-btn" type="button" 
            onClick = {() => changePage(paginas.pagina_actual === 1 ? paginas.pagina_actual : paginas.pagina_actual - 1)}>
                <FontAwesomeIcon icon="fas fa-chevron-left" />
            </button>
            <div className="page-numbers">
                {(numberButtons?.length || false) ? (
                    numberButtons.map((e, i) => 
                    <button key = {i}
                        onClick = {() => changePage(e)}
                        className={`pagination-btn ${paginas.pagina_actual === e ? "active" : ""}`} 
                        type="button">
                            {e}
                    </button>)) 
                    : null}
            </div>
            <button className="pagination-btn next-btn" type="button"
            onClick = {() => changePage(paginas.pagina_actual === paginas.pagina_maxima ? paginas.pagina_actual : paginas.pagina_actual + 1)}>
                <FontAwesomeIcon icon="fas fa-chevron-right" />
            </button>
        </div>
    );
}

export default Paginacion;