import Banner from "components/Banner/Banner"
import Card from "components/Card"
import Titulo from "components/Titulo"
import styles from "./index.module.css"
import { useEffect, useState } from "react"
//import videos from "/db.json"
import { useVideos } from "context/VideosContext";
/* function Inicio(){
  const [videos, setVideos] = useState([])
  useEffect(()=>{
    fetch("https://my-json-server.typicode.com/YerlinRojas/cinema-player/videos")
    .then(response =>response.json())
    .then(data=>{
      setVideos(data)
    })
  },[])
    return(
      <>

      <Banner img='home' color='#154580'></Banner>
      <Titulo>
        <h1>
          Un lugar para guardar videos fav
        </h1>
      </Titulo>
      <section className={styles.container}></section>
      
      {videos.map((video)=>{
        return <Card{...video}  key={video.id}/>
      })}

      </>

    )
}

export default Inicio */

// para hacerlo por el json server arriba
// abajo para hacerlo desde una data interna 
/* function Inicio() {
  return (
    <>
     
      <Banner img="home" color="#154580" />
      <Titulo>
        <h1>Un lugar para guardar sus videos favoritos </h1>
      </Titulo>

      <section className={styles.container}>
        {videos.map((video) => {
          return <Card {...video} key={video.id} />;
        })}
      </section>


    </>
  );
}

export default Inicio; */
function Inicio() {
  const { videos, setVideos, loading, error } = useVideos();
  const videoData = videos?.videos || [];  // Asegúrate de acceder correctamente a los videos

  // Maneja la eliminación de un video
  const handleEliminar = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este video?");
    if (confirmacion) {
      // Filtra los videos para excluir el eliminado
      const nuevosVideos = videoData.filter((video) => video.id !== id); // Usa videoData aquí
      setVideos({ videos: nuevosVideos }); // Actualiza el contexto con los videos restantes
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los videos: {error}</div>;
  }

  console.log(videoData);  // Revisa en la consola la estructura de los datos

  return (
    <div>
      <Banner img="home" color="#154580" />
      <Titulo>
        <h1>Un lugar para guardar sus videos favoritos</h1>
      </Titulo>
      <section className={styles.container}>
        {videoData.map((video) => (
          <Card {...video} key={video.id} onEliminar={handleEliminar} />
        ))}
      </section>
    </div>
  );
}

export default Inicio;
