import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVideos } from "context/VideosContext"; // Usar el contexto de videos
import styles from "./CrearVideo.module.css"; // Importar el archivo CSS

function CrearVideo() {
  const [titulo, setTitulo] = useState("");
  const [capa, setCapa] = useState("");
  const [link, setLink] = useState("");
  const { setVideos, videos } = useVideos();
  const navigate = useNavigate();
  const videoData = Array.isArray(videos) ? videos : videos?.videos || []
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoVideo = {
      id: videos.length + 1, // Generar un nuevo ID
      titulo,
      capa,
      link,
    };

    // Agregar el nuevo video al contexto
    setVideos([...videoData, nuevoVideo]);

    // Redirigir al inicio después de la creación
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <h1>Crear Nuevo Video</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="capa">URL de la Capa:</label>
          <input
            type="url"
            id="capa"
            value={capa}
            onChange={(e) => setCapa(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="link">URL del Video:</label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Video</button>
      </form>
    </div>
  );
}

export default CrearVideo;
