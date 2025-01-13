import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useVideos } from "context/VideosContext";
import { fetchVideos } from "utils/fetchVideos";
import styles from "./EditForm.module.css"

const EditForm = () => {
  const { videos, setVideos } = useVideos(); // Ahora accedemos a videos y setVideos desde el contexto
  const { id } = useParams();
  const navigate = useNavigate();

  // Manejo de datos de video
  const videoData = Array.isArray(videos) ? videos : videos?.videos || [];
  const video = videoData.find((video) => video.id === Number(id));

  const [formData, setFormData] = useState({
    titulo: video?.titulo || "",
    capa: video?.capa || "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Formulario enviado con datos:", formData);

    if (!formData.titulo.trim() || !formData.capa.trim()) {
      setError("Todos los campos son obligatorios.");
      console.log("Error: Campos vacíos detectados.");
      return;
    }

    try {
      console.log("Enviando solicitud PUT al backend...");

      // 1. Realiza la solicitud PUT al backend
      const response = await fetch(`http://localhost:5000/api/videos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Respuesta del servidor recibida:", response.status);

      if (!response.ok) {
        throw new Error("Error al actualizar el video en la base de datos");
      }

      // 2. Obtén el video actualizado desde la respuesta del backend
      const updatedVideo = await response.json();
      console.log("Video actualizado recibido del servidor:", updatedVideo);

      // 3. Actualiza el contexto con el video actualizado
      setVideos((prev) =>
        Array.isArray(prev)
          ? prev.map((video) =>
              video.id === Number(id) ? { ...video, ...formData } : video
            )
          : [] // Si no es un array, devuelve un array vacío
      );

      // 4. Vuelve a obtener todos los videos desde el backend
      console.log("Volviendo a obtener todos los videos...");
      const updatedVideos = await fetchVideos();
      console.log("Videos actualizados obtenidos:", updatedVideos);

      // 5. Actualiza el contexto con los nuevos videos
      setVideos(updatedVideos?.videos || []); // Asegúrate de que los videos estén correctamente formateados

      // 6. Navega de vuelta a la página principal
      console.log("Navegando de vuelta a la página principal...");
      navigate("/home");
    } catch (error) {
      console.error("Error capturado en el bloque try-catch:", error);
      setError("Hubo un error al guardar los cambios. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Editar Video</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          URL de la imagen:
          <input
            type="text"
            name="capa"
            value={formData.capa}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditForm;
