import Navegacion from "./navegacion";

const Footer = () => {
    return(
        <footer className="footer">
            <div className="contenedor contenido">
                <Navegacion />

                <p className="copyright">© Todos los derechos reservados {new Date().getFullYear()} </p>
            </div>
        </footer>
    )
}

export default Footer;