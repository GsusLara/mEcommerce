import { useState } from 'react'
import Image from 'next/image'
import Link from "next/link"
import logo from "../../public/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Login from '../../components/login';


export default function Navbar() {
  const [btnMenu, setbtnMenu] = useState(false)
  const menuActivo = () => {
    setbtnMenu(!btnMenu);
  }
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
                className="nav-link p-0 fs-4 "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
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

      
            
            <Login/>
          

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