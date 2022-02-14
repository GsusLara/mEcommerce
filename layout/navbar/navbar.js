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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const menuActivo = () => {
    setbtnMenu(!btnMenu);
  }
  useEffect(() => {
    const autenticando = onAuthStateChanged(auth, (usuarioFirebase) => {
      console.log(usuarioFirebase)
      handleClose
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
            <li className="nav-item"><a className="nav-link" onClick={() => signOut(auth)}>salir</a></li>
            <li className="nav-item">
              <a
                className="nav-link p-0 fs-4 "
                onClick={handleShow}>
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
              <a
                className="nav-link p-0 fs-4"
                href="#">
                <FontAwesomeIcon className="iconosNav" icon={["fas", "shopping-cart"]} />
                <span className="ms-2 opcionesNav">carrito</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Login handleClose={handleClose} handleShow={handleShow} />
        {/* <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p>
        </Modal.Body> */}
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