
/* export const fetchVideos = async () => {
    try {
      const response = await fetch("/db.json");  // Ruta relativa a la carpeta public
      if (!response.ok) {
        throw new Error("Error al cargar los videos");
      }
      const data = await response.json();
      return data; // Aquí retornamos los datos de los videos desde db.json
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
   */

  export const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/videos");  // Ruta de la API configurada en server.js
      if (!response.ok) {
        throw new Error("Error al cargar los videos");
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  