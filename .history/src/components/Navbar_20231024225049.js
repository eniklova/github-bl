import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiCodeAlt } from "react-icons/bi";
import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [ showMenu, setShowMenu ] = useState(false)
  


  return (
    <header className="header">
      <div className="navigation">
        <div className="nav-header">
          <i className="logo-icon">
            <BiCodeAlt />
          </i>
          <h1 className="logo-title">
            <a href="/" rel="home">webblog [ IT ]</a>
          </h1>
          <button onClick={() => setShowMenu(!showMenu) }>
            <GiHamburgerMenu className="hamburger-icon" />
          </button>
        </div>
      </div>

      <div className={`${showMenu ? "nav-menu show" : "nav-menu hide"}`}>

        <NavLink to="/" className={ ({isActive}) => isActive ? "activeLink link" : "nonactiveLink link"}>Home</NavLink>  
        <NavLink to="aboutme" className={ ({isActive}) => isActive ? "activeLink link" : "nonactiveLink link"}>O mne</NavLink> 
        <NavLink to="articles" className={ ({isActive}) => isActive ? "activeLink link" : "nonactiveLink link"}>Články</NavLink>
        <NavLink to="kontakt" className={ ({isActive}) => isActive ? "activeLink link" : "nonactiveLink link"}>Kontakt</NavLink>
        <NavLink to="newarticel" className={ ({isActive}) => isActive ? "activeLink link" : "nonactiveLink link"}>Pridaj článok</NavLink>
        <NavLink to="newcategory" className={ ({isActive}) => isActive ? "activeLink link" : "nonactiveLink link"}>Pridaj kategoriu</NavLink>
      </div>    
    </header>
  );
}

export default Navbar;
