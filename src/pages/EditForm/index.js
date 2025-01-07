import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useVideos } from "context/VideosContext";

/* function EditForm({ videos, setVideos }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Asegúrate de acceder correctamente a los videos dentro de la estructura
  const videoData = Array.isArray(videos) ? videos : videos?.videos || []; // Manejo flexible
  const video = videoData.find((video) => video.id === Number(id));

  const [formData, setFormData] = useState({
    titulo: video?.titulo || "",
    capa: video?.capa || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza la petición PUT al servidor
      const response = await fetch(`http://localhost:5000/api/videos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el video en la base de datos");
      }

      const updatedVideo = await response.json();

      // Actualiza el estado local con los nuevos datos
      setVideos((prev) =>
        Array.isArray(prev)
          ? prev.map((video) =>
              video.id === Number(id) ? { ...video, ...formData } : video
            )
          : prev
      );

      // Redirige a la página principal
      navigate("/");
    } catch (error) {
      console.error("Error al actualizar el video:", error);
      alert("Hubo un error al intentar guardar los cambios.");
    }
  };

  return (
    <div>
      <h2>Editar Video</h2>
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
        <br />
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
        <br />
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}
 */

function EditForm({ videos, setVideos }) {
  const { id } = useParams();
  const navigate = useNavigate();


  const { updateVideoInContext } = useVideos();

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

    if (!formData.titulo.trim() || !formData.capa.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/videos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el video en la base de datos");
      }

      const updatedVideo = await response.json();
      updateVideoInContext(updatedVideo);

      setVideos((prev) =>
        Array.isArray(prev)
          ? prev.map((video) =>
              video.id === Number(id) ? { ...video, ...formData } : video
            )
          : prev
      );

      navigate("/");
    } catch (error) {
      console.error("Error al actualizar el video:", error);
      setError("Hubo un error al guardar los cambios. Por favor, inténtalo de nuevo.");
    }
  }; 

  return (
    <div>
      <h2>Editar Video</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
        <br />
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
        <br />
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditForm;


