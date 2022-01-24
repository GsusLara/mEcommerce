import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { auth } from "../../store/firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider } from "firebase/auth"


export default function Login() {
    const googleProvider = new GoogleAuthProvider();
    const [conCuenta, setconCuenta] = useState(true);
    const [credentials, setcredentials] = useState({ email: "", password: "", password2: "" });
    const revisionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const changeUser = (e) => {
        setcredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    const registerUser = async () => {
        try {
            await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
            ///accion
        } catch (error) {
            console.log(error)
        }
    }
    const iniciaUser = async () => {
        try {
            await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
            ///accion
        } catch (error) {
            console.log(error)
        }
    }

    const verificar = () => {
        if (revisionEmail.test(credentials.email) !== true || credentials.password.length < 8) {
            alert("email o password invalido")
        } else if (conCuenta) {
            iniciaUser()
        } else if (credentials.password !== credentials.password2) {
            alert("las contraseñas no coinciden")
        } else {
            registerUser();
        }
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{conCuenta ? "Iniciar sesión" : "Crear cuenta"}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                        <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
                            
                            {conCuenta ?
                                <button className="btn btn-primary " onClick={() => signInWithRedirect(auth, googleProvider)}><img src="/google.ico" alt="inicio google" />oogle</button>:
                                <button className="btn btn-danger" onClick={() => signInWithRedirect(auth, googleProvider)}> <FontAwesomeIcon icon={["fab", "google"]} /> &nbsp; Utiliza tu cuenta de Google</button>
                            }
                                <p className="my-3">ó</p>
                            <div>
                                <form >
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={["fa", "envelope"]} /></span>
                                        <input
                                            name="email"
                                            type="email"
                                            autoComplete="on"
                                            className="form-control"
                                            placeholder="Email address"
                                            onChange={changeUser}
                                            onKeyPress={e => {
                                                if (e.key == "Enter") {
                                                    verificar();
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={["fa", "lock"]} /></span>
                                        <input
                                            name="password"
                                            type="password"
                                            autoComplete="on"
                                            className="form-control"
                                            placeholder={conCuenta ? "password" : "contraseña superior a 8 digitos"}
                                            onChange={changeUser}
                                            onKeyPress={e => {
                                                if (e.key == "Enter") {
                                                    verificar();
                                                }
                                            }}
                                        />
                                    </div>
                                    <div style={{ display: conCuenta ? "none" : "block" }}>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={["fa", "lock"]} /></span>
                                            <input
                                                name="password2"
                                                type="password"
                                                autoComplete="on"
                                                className="form-control"
                                                placeholder="confirme su contraseña"
                                                onChange={changeUser}
                                                onKeyPress={e => {
                                                    if (e.key == "Enter") {
                                                        verificar();
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </form>
                                <div>
                                    <button className="btn btn-primary mt-2 mb-3" onClick={() => verificar()}> {conCuenta ? "ingresar" : "Registrarme"}</button>
                                </div>
                                <div className="modal-footer">
                                    {conCuenta ?
                                        <p>Registrate {" "}<a className="text-primary loginButton" onClick={() => setconCuenta(false)}>aqui</a> </p> :
                                        <p>tienes cuenta? <a className="text-primary loginButton" onClick={() => setconCuenta(true)}>Iniciar sesión</a> </p>
                                    }
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )
}

