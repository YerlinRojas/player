import Favoritos from "pages/Favoritos";
import Inicio from "pages/Inicio";
import NotFound from "pages/NotFound";
import PaginaBase from "pages/PaginaBase";
import Player from "pages/Player";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useVideos } from "context/VideosContext"
import EditForm from "pages/EditForm";
import CrearVideo from "pages/CrearVideo";
function AppRoutes() {
  const { videos, loading, error, setVideos } = useVideos(); // Accede a los videos desde el contexto

  // Función para editar un video
  const handleEdit = (id, updatedData) => {
    // Asegúrate de que 'videos' sea un array antes de mapearlo
    if (Array.isArray(videos)) {
      setVideos((prev) =>
        prev.map((video) =>
          video.id === id ? { ...video, ...updatedData } : video
        )
      );
    } else {
      console.error("videos no es un array", videos);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaBase />}>
          <Route index element={<Inicio />} />
          <Route path="favoritos" element={<Favoritos />} />
          <Route path=":id" element={<Player />} />
          <Route path="crear" element={<CrearVideo />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/editar/:id"
            element={<EditForm videos={videos} onEdit={handleEdit} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;