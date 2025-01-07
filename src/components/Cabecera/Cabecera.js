
import { Link } from 'react-router-dom'
import styles from './Cabecera.module.css'
import logo from './logoA.png'
import CabeceraLink from 'components/CabeceraLink/CabeceraLink'

function Cabecera() {
  return (
    <header className={styles.cabecera}>
    <Link to='/'>
        <section className={styles.logoContainer}>
    <img src={logo} alt='logo Alura' /> <span>cinema</span>
        </section>
    </Link>    
    <nav>
        <CabeceraLink url='./' >
            Home
        </CabeceraLink>
        <CabeceraLink url='./Favoritos' >
            Favoritos
        </CabeceraLink>
        <CabeceraLink url='./crear' >
            Crear Nuevo
        </CabeceraLink>
    </nav>
        
    </header>
  )
}

export default Cabecera