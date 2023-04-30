import { useEffect, useState } from "react";
import{
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
} from "@remix-run/react";
import styles from "~/styles/index.css";
import Header from "~/components/header";
import Footer from "~/components/footer";

export function meta(){
    return[
        { charset: "utf-8"},
        {title: "GuitarLa - Remix"},
        {viewport: "width=device-width, initial-scale=1"}
    ];    
}

export function links(){
    return [
        {
            rel: "stylesheet",
            href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
        },
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com"
        },{
            rel: "preconnect",
            crossOrigin: "true",
            href: "https://fonts.gstatic.com"
        },{
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&family=Tajawal&display=swap"
        },{
            rel: "stylesheet",
            href: styles
        }
    ];
}

export default function App(){
    /*
    localStorage es una API del navegador. No funciona en el server y Remix se ejecuta en ambos lados.
    El servidor no tiene el objeto "window"
    La solucion es poner "typeof window" porque "window" no existe en el servidor entonces no ejecuta nada.
    */
    const carritoLS = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("carrito")) ?? [] : null;
    /*
    Entonces yo hacá le digo que si el type es diferente a undefined (que existe en el cliente) que me traiga lo de LS.
    Si es "undefined" esta ejecutando esa linea en el servidor y ahi le digo que devuelva "null"    
    */
    
    const [carrito, setCarrito] = useState(carritoLS);

    useEffect(() =>{
        localStorage.setItem("carrito", JSON.stringify(carrito));
    },[carrito]);

    const agregarCarrito = guitarra => {
        if(carrito.some(guitarraState => guitarraState.id === guitarra.id)){
            //Itero sobre el arreglo, e identifico el elemento duplicado
            const carritoActualizado = carrito.map(guitarraState => {
                if(guitarraState.id === guitarra.id){
                    //Reescribo la cantidad
                    guitarraState.cantidad += guitarra.cantidad;
                }
                return guitarraState;
            });
            //Añadir al carrito
            setCarrito(carritoActualizado);
        } else {
            //Registro nuevo, agrego al carrito
            setCarrito([...carrito, guitarra]);
        }
    }

    const actualizarCantidad = guitarra => {
        const carritoActualizado = carrito.map(guitarraState => {
            if(guitarraState.id === guitarra.id){
                guitarraState.cantidad = guitarra.cantidad;
            }
            return guitarraState;
        });
        setCarrito(carritoActualizado);
    }

    const eliminarGuitarra = id => {
        const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id);
        setCarrito(carritoActualizado);
    }

    return(
        <Document>
            <Outlet 
                context={{
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    eliminarGuitarra
                }}
            />
        </Document>
    )
}

function Document({children}){
    return(
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

/*** Manejo de errores ***/
/* 
export function ErrorBoundary(){
    const error = useRouteError();
    if(isRouteErrorResponse(error)){
        return(
            <Document>
                <p className="error">Status: {error.status}</p>
                <p className="error">{error.statusText}</p>
                <Link className="error-enlace" to="/">Home</Link>
            </Document>
            
        );
    }
}
*/