import Link from "next/link"

export default function Menu() {
    return (
        <div className="container-fluid p-0 m-0 barraMenu">
            <div className="container px-5 text-center">
                <div className="btn-group">
                    <button className="btn btn-secondary btn-sm dropdown-toggle btnMenu" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Tienda
                    </button>
                    <ul className="dropdown-menu">
                        <ListadoCategorias categoria="PlayStation" />
                        <ListadoCategorias categoria="Xbox" />
                        <ListadoCategorias categoria="Nes" />
                    </ul>
                </div>
                <button type="button" className="btn btn-secondary btn-sm mx-2 mx-md-5 btnMenu">Acerca de</button>
                <button type="button" className="btn btn-secondary btn-sm btnMenu">Contacto</button>
            </div>
        </div>
    )
}
function ListadoCategorias(props) {
    const { categoria } = props
    return (
        <li>
            <Link href={`/${categoria}`}>
                <a className="dropdown-item">{categoria}</a>
            </Link>
        </li>
    )
}
