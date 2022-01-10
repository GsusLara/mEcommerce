import Navbar from "./navbar"
import Footer from "./footer"
import Menu from "./menu"

export default function Layout(props) {
    const { children } = props
    return (
        <div className="container-fluid Pagina">
            <Navbar/>
            <Menu/>
            <div className="container Contenido">
                {children}
            </div>
            <Footer/>
        </div>
    )
}
