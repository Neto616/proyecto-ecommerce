import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'; 

function SideBar({ isOpen, onClose }){
    return(
        <nav className={`sidebar-menu ${isOpen ? 'active' : ''}`}>
            <button type="button" className="close-sidebar-button" onClick={onClose}>
                <FontAwesomeIcon icon="fas fa-times"/>
            </button>
            <h3 onClick={onClose}>Categorías</h3>
            <ul>
                <li><Link to="/productos/electronica">Electrónica</Link></li>
            </ul>
        </nav>
    );
}

export default SideBar;