import Image from 'next/image'
import Link from "next/link"
import logo from "../../public/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="col-5 col-md-3 col-lg-2">
          <Logo />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ms-md-5" id="navbarSupportedContent">
          <ul className="navbar-nav  mb-2 mb-lg-0 ms-md-auto">
            <li className="nav-item">
              <a
                className="nav-link p-0 fs-4"
                href="#">
                <FontAwesomeIcon icon={["far", "user"]} />
              </a>
            </li>
            <li className="nav-item">
              <a 
              className="nav-link p-0 fs-4 mx-3" 
              href="#">
                <FontAwesomeIcon icon={["far", "heart"]} />
                </a>
            </li>
            <li className="nav-item">
            <a 
              className="nav-link p-0 fs-4" 
              href="#">
                <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                </a>
            </li>
          </ul>
          {/* <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form> */}
        </div>
      </div>
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