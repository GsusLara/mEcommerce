import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Image from 'next/image'
import Link from "next/link"
import logo from "../../public/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Login from '../../components/login';
import { auth } from "../../store/firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth"


export default function Navbar() {
  const [btnMenu, setbtnMenu] = useState(false)
  const [show, setShow] = useState(false);
  const [sesion, setsesion] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const menuActivo = () => {
    setbtnMenu(!btnMenu);
  }
  const offSesion = () => {
    setsesion(false);
    signOut(auth);
  }
  const inicio = (data) => {
    setsesion(true);
    handleClose();
    console.log(data);
  }
  useEffect(() => {
    const autenticando = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        inicio(usuarioFirebase);
      }
    })
    return () => {
      autenticando()
    }
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <div className="col-5 col-md-3 col-lg-2 imglogo">
          <Logo />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => menuActivo()}>
          {btnMenu ?
            <FontAwesomeIcon className="iconosNav" icon={["fas", "times"]} /> :
            <FontAwesomeIcon className="iconosNav" icon={["fas", "bars"]} />
          }
        </button>
        <div className="collapse navbar-collapse ms-md-5" id="navbarSupportedContent">
          <form className="d-flex mx-auto my-2 my-lg-0">
            <input className="form-control buscador" type="text" />
            <button className="btnbuscar btn fs-5" type="submit"> <FontAwesomeIcon icon={["fas", "search"]} /></button>
          </form>
          <ul className="navbar-nav  mb-2 mb-lg-0 ms-md-auto">
            <li className="nav-item">
              <a
                className="nav-link p-0 fs-4 me-lg-3"
                href="#">
                <FontAwesomeIcon className="iconosNav" icon={["fas", "shopping-cart"]} />
                <span className="ms-2 opcionesNav">carrito</span>
              </a>
            </li>
            {!sesion &&
              <li className="nav-item">
                <button
                  className=" navButton nav-link p-0 fs-4"
                  onClick={handleShow}>
                  <FontAwesomeIcon className="iconosNav" icon="fa-solid fa-user-pen" />
                  <span className="ms-2 opcionesNav">Entrar/Registrarse</span>
                </button>
              </li>
            }
            {sesion &&
              <>
                <li className="nav-item">
                  <a
                    className="nav-link p-0 fs-4 "
                    href="#">
                    <FontAwesomeIcon className="iconosNav" icon={["far", "user"]} />
                    <span className="ms-2 opcionesNav">Mi cuenta</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link p-0 fs-4 mx-lg-3"
                    href="#">
                    <FontAwesomeIcon className="iconosNav" icon={["far", "heart"]} />
                    <span className="ms-2 opcionesNav">Favoritos</span>
                  </a>
                </li>
                <li className="nav-item">
                  <button className="navButton nav-link p-0 fs-4" onClick={() => offSesion()} >
                    <FontAwesomeIcon className="iconosNav" icon="fa-solid fa-arrow-right-from-bracket" />
                    <span className="ms-2 opcionesNav">Salir</span>
                  </button>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Login handleClose={handleClose} handleShow={handleShow} />
      </Modal>
    </nav>
  )
}

function Logo() {
  return (
    <Link href="/">
      <a className="navbar-brand"><Image src={logo} alt="logo" /></a>
    </Link>
  )
}