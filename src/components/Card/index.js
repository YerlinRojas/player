import { useFavoritosContext } from "context/Favoritos";
import styles from "./Card.module.css";
import iconFavorito from "./iconFavorito.png";
import iconNoFavorito from "./iconNoFavorito.png";
import btnEliminar from "./delete.png"
import btnEditar from "./edit.png"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

function Card({ id, capa, titulo, onEliminar}) {
  const navigate = useNavigate()
  const { favorito, agregarFavorito } = useFavoritosContext()
  const isFavorito = favorito.some(fav => fav.id === id)
  const icon = isFavorito ? iconFavorito : iconNoFavorito
  console.log("card", id, capa, titulo)
  return (
    <div className={styles.container}>
      <Link className={styles.link} to={`/${id}`}>
        <img src={capa} alt={titulo} className={styles.capa} />
        <h2>{titulo}</h2>
      </Link>
      <img
        src={icon}
        alt="Icono favorito"
        className={styles.favorito}
        onClick={() => agregarFavorito({ id, titulo, capa })}
      />
      <div className={styles.actions}>
      <img
  src={btnEliminar}
  alt="Eliminar"
  className={styles.btnEliminar}
  onClick={() => onEliminar(id)} 
/>
        <button
          className={styles.btnNoFormat}
          onClick={() => navigate(`/editar/${id}`)} 
        >
          <img className={styles.btnEditar} src={btnEditar} alt="Editar" />
        </button>

      </div>
    </div>
  );
}
export default Card;