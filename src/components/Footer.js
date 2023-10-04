import "./Footer.css"
import { NavLink } from "react-router-dom";
import { FaFacebookSquare, FaGithubSquare, FaInstagram, FaLinkedin } from 'react-icons/fa';





const Footer = () => {
    return <footer>
    <section className="footer">
        <div className="social">
        <a href="https://www.facebook.com/niklova/"><FaFacebookSquare className="icon-facebook"></FaFacebookSquare></a>
        <a href="https://www.instagram.com/e.nial/"><FaInstagram className="icon-instagram"></FaInstagram></a>
        <a href="https://www.linkedin.com/in/eva-niklov%C3%A1-b4b381272/"><FaLinkedin className="icon-linkedin"></FaLinkedin></a>
        <a href="https://github.com/eniklova"><FaGithubSquare className="icon-github"></FaGithubSquare></a>
      </div>

      <ul className="list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="aboutme">O mne</NavLink>
          </li>
          <li>
            <NavLink to="articles">Články</NavLink>
          </li>
          <li>
            <NavLink to="aboutme">Kontakt</NavLink>
          </li>
         
        </ul>

    </section>

    <p className="copyright">
    @ 2023  Niklová Eva 
    </p>
    </footer>    

          
  }


export default Footer;
