import imagen from "../../public/img/nosotros.jpg"
import styles from "../styles/nosotros.css"

export function meta(){
    return [
        {title: "GuitarLa - Nosotros"},
        {description: "Venta de guitarras, blog de música y más."}
    ]
}
export function links(){
    return [
        {
            rel: "stylesheet",
            href: styles
        },{
            rel: "preload",
            href: imagen,
            as: "image"
        }
    ]
}

const Nosotros = () => {
    return(
        <main className="contenedor nosotros">
            <h2 className="heading">Nosotros</h2>
            
            <div className="contenido">
                <img src={imagen} alt="Imagen sobre nosotros" />
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempus ullamcorper eros, rhoncus feugiat lectus posuere ac. Donec malesuada ligula turpis, non ultricies augue dignissim nec. Sed eget vulputate felis, nec fringilla ante. Integer molestie gravida nibh, eget consequat quam lacinia et. Quisque dignissim odio leo, molestie mattis est eleifend in.</p>
                    <p>Duis rutrum finibus lorem, condimentum imperdiet leo. Curabitur mollis at dolor quis porttitor. Mauris justo ex, imperdiet et felis nec, aliquet varius massa. Pellentesque ultrices, nunc quis semper fermentum, leo ipsum viverra purus, nec tempus quam sem nec arcu.</p>
                </div>
            </div>
        </main>
    )
}

export default Nosotros;