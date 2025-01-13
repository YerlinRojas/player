import Banner from "components/Banner/Banner";
import styles from "./VideoDetail.module.css";
import Titulo from "components/Titulo";
import { useParams } from "react-router-dom";
import NotFound from "pages/NotFound";
import { useEffect, useState } from "react";
import { useVideos } from "context/VideosContext"; // Importa el contexto

function VideoDetail() {

  const { id } = useParams(); // Obtiene el id desde los parámetros de la URL
  const { videos, loading, error } = useVideos(); // Obtiene los videos desde el contexto
  const [video, setVideo] = useState(null);

  useEffect(() => {
    // Asegúrate de acceder correctamente a los videos dentro del objeto
    const videoData = videos?.videos || [];  // Accede al array dentro del objeto 'videos'
    const selectedVideo = videoData.find((video) => video.id === Number(id));
    setVideo(selectedVideo);
  }, [id, videos]); // Dependencias: cuando cambia el id o los videos

  if (loading) return <div>Cargando...</div>; // Muestra "Cargando..." mientras los videos se cargan
  if (error) return <div>Error: {error}</div>; // Muestra el error si ocurre

  if (!video) return <NotFound />; // Si no se encuentra el video, muestra la página de error

  return (
    <>
      <Banner img="player" color="#58B9AE" />
      <Titulo>
        <h1>Player</h1>
      </Titulo>
      <section className={styles.container}>
        <iframe
          width="100%"
          height="100%"
          src={video.link}
          title={video.titulo}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <h1>{video.titulo}</h1>
      </section>
    </>
  );
}

export default VideoDetail;
