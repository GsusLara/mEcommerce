import Navbar from "./navbar"
import Menu from "./menu"
import Footer from "./footer"

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
