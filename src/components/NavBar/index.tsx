import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="nav-container">
      <Link to="/">Página Principal</Link> | <Link to="/followers">Lista de Seguidores</Link>
    </nav>
  );
};

export default NavBar;
