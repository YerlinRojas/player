import React, { createContext, useState, useEffect } from "react";
import { fetchVideos } from "utils/fetchVideos"; // Esta es la función para obtener los datos

const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videoData = await fetchVideos(); // Llama a la función para obtener los videos
        setVideos(videoData); // Guarda los videos en el estado
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    loadVideos();
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  return (
    <VideosContext.Provider value={{ videos, loading, error, setVideos }}>
      {children}
    </VideosContext.Provider>
  );
};

export const useVideos = () => {
  return React.useContext(VideosContext); // Custom hook para usar el contexto
};

