import { useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import styles from "~/styles/carrito.css";

export function links(){
    return[
        {
            rel: "stylesheet",
            href: styles
        }
    ]
}

export function meta(){
    return [
        {title: "GuitarLa - Carrito de Compras"},
        {description: "Venta de guitarras, música, blog, carrito de compras y más."}
    ]
}

const Carrito = () => {
    const [total, setTotal] = useState(0);
    const {carrito, actualizarCantidad, eliminarGuitarra} = useOutletContext();

    useEffect(() => {
    //reduce toma dos parametros. uno es el total y el otro la instancia actual.
    //total es el acumulado y el otro es el valor actual. Si tenemos un array de objetos, es el obj en el cual estamos iterando
    //hay que ponerle el valor inicial. en este caso es 0 
        const calculoTotal = carrito.reduce((total, producto) => total + (producto.cantidad * producto.precio),0);
        setTotal(calculoTotal);
    },[carrito]);

    return(
        <main className="contenedor">
            <h1 className="heading">Carrito de compras</h1>
            <div className="contenido">
                <div className="carrito">
                    <h2>Artículos</h2>

                    {carrito?.length === 0 ? "Carrito Vacío" : (
                        carrito?.map(producto => (
                            <div key={producto.id} className="producto">
                                <div>
                                    <img src={producto.imagen} alt={`Imagen del producto ${producto.nombre}`} />
                                </div>
                                <div>
                                    <p className="nombre">{producto.nombre}</p>
                                    <p>Cantidad:</p>
                                    
                                    <select 
                                        value={producto.cantidad}
                                        className="select"
                                        onChange={e => actualizarCantidad({
                                            cantidad: parseInt(e.target.value),
                                            id: producto.id
                                        })}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    <p className="precio">$<span>{producto.precio}</span></p>
                                    <p className="subtotal">Subtotal: $<span>{producto.cantidad * producto.precio}</span></p>
                                </div>
                                <button
                                    type="button"
                                    className="btn_eliminar"
                                    onClick={() => eliminarGuitarra(producto.id)} 
                                >X</button>
                            </div>
                        ))
                    )}

                </div>
                <aside className="resumen">
                    <h3>Resumen del pedido</h3>
                    <p>Total a pagar: ${total}</p>
                </aside>
            </div>
        </main>
    );
}

export default Carrito;