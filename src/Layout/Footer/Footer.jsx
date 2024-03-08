import { NavLink } from "react-router-dom"
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css'

export default function Footer() {
    return (
        <footer>
            <div className="footer-seccion seccion1">
                <ul>
                    <li>
                        <a className="a-link" href="www.instagram.com/GameXpress"><FontAwesomeIcon icon={faInstagram} /> Instagram</a>
                    </li>
                    <li>
                        <a className="a-link" href="www.facebook.com/GameXpress"><FontAwesomeIcon icon={faFacebook} />facebook</a>
                    </li>
                    <li>
                        <a className="a-link" href="https://wa.me/5493364543654"><FontAwesomeIcon icon={faWhatsapp}/>+54 9
                            336-4543654</a>
                    </li>
                    <li>
                        <a className="a-link" href="mailto:GameXpress@gmail.com"><FontAwesomeIcon icon={faEnvelope} />GameXpress@gmail.com</a>
                    </li>
                </ul>
            </div>
            <div className="footer-seccion seccion2">
                <div id="logo-footer">
                    <FontAwesomeIcon icon={faGamepad} />
                    GameXpress
                </div>
                <b className="parrafo">Tu puerta de entrada al mundo del entretenimiento digital. Apasionados por la tecnología,
                    tenemos lo
                    último y más emocionante en consolas gamers.
                </b>
            </div>
            <div className="footer-seccion seccion3">
                <ul>
                    <li><NavLink className="nav-link" to="/contact">CONTACTO</NavLink></li>
                    <li><NavLink className="nav-link" to="/register">REGISTRO</NavLink></li>
                    <li><NavLink className="nav-link" to="/about-us">ACERCA DE</NavLink></li>
                </ul>
            </div>
        </footer>
    )
}