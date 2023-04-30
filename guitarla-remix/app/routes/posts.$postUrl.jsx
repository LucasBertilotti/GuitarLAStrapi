import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/posts.server";
import { formatearFecha } from "~/utils/helpers";
import styles from "~/styles/blog.css"

export function meta(){
    return [
        {title: `GuitarLa - Nuestro Blog`},
        {descripcion: `GuitarLA,  Blog de música y venta de guitarras`}
    ]
}

export function links(){
    return[
        {
            rel: "stylesheet",
            href: styles
        }
    ];
}
export async function loader({params}){
    const { postUrl } = params;
    const post = await getPost(postUrl);

    if(post.data.length === 0){
        throw new Response("",{
            status: 404,
            statusText: "Post no encontrado"
        });
    }

    return post;
}

const Post = () => {
    const post = useLoaderData();
    const { titulo, contenido, imagen, publishedAt } = post?.data[0]?.attributes;

    return(
        <article className="contenedor post mt-3">
            <img src={imagen?.data?.attributes?.url} alt={`imagen blog ${titulo}`} />
            <div className="contenido">
                    <h3>{titulo}</h3>
                    <p className="fecha">{formatearFecha(publishedAt)}</p>
                    <p className="resumen">{contenido}</p>
                </div>
        </article>
    );
}

export default Post;