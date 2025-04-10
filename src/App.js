// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./views/inicio";
import Login from "./views/login";
// más vistas en el futuro
import Topbar from "./components/Topbar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        {/* futuras rutas */}
      </Routes>
    </Router>
  );
};

export default App;
