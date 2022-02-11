import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth } from "../../store/firebaseConfig";
import { toast } from "react-toastify"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

export default function Login() {
    const googleProvider = new GoogleAuthProvider();
    const [conCuenta, setconCuenta] = useState(true);
    const [loading, setloading] = useState(false);
    const [credentials, setcredentials] = useState({ email: "", password: "", password2: "" });
    const revisionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const changeUser = (e) => {
        setcredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    const verificar = () => {
        if (credentials.email == "" || credentials.password == "") {
            toast.error("Complete todos los campos")
        } else if (revisionEmail.test(credentials.email) !== true) {
            toast.error("Ingrese un email válido")
        } else if (credentials.password.length < 8) {
            conCuenta ?
                toast.error("Email o contraseña invalido") :
                toast.error("La contraseña debe ser superior a 8 caractéres")
        } else if (conCuenta) {
            iniciaUser()
        } else if (credentials.password !== credentials.password2) {
            toast.error("Las contraseñas no coinciden")
        } else {
            registerUser();
        }
    }
    const registerUser = async () => {
        setloading(true);
        try {
            await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
        } catch (error) {
            toast.error("Correo en uso, inicia sesion para acceder")
            setconCuenta(true)
        }
        setloading(false)
    }
    const iniciaUser = async () => {
        setloading(true);
        try {
            await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        } catch (error) {
            toast.error("Email o contraseña invalido")
        }
        setloading(false)
    }
    const iniciaGoogle = async()=>{
        try {
            await signInWithRedirect(auth, googleProvider)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const autenticando = onAuthStateChanged(auth, (usuarioFirebase) => {
            console.log(usuarioFirebase)
        })
        return () => {
            autenticando()
        }
    }, [])

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{conCuenta ? "Iniciar sesión" : "Crear cuenta"}</h5>
                        <button type="button" className="closeBtn" data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={["fas", "times"]} /></button>
                    </div>
                    <div className="modal-body text-center">
                        <div className="card-body mx-auto" style={{ maxWidth: "400px" }}>
                            <button className="btn btn-outline-primary" onClick={() => iniciaGoogle()}><img src="/google.ico" alt="inicio google" />oogle</button>
                            <p className="linea my-3 fs-5"><span className="px-2 bg-dark">ó</span></p>
                            <div>
                                <form>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={["fa", "envelope"]} /></span>
                                        <input
                                            className="form-control"
                                            name="email"
                                            type="email"
                                            autoComplete="on"
                                            placeholder="Correo electrónico"
                                            onChange={changeUser}
                                            onKeyPress={e => {
                                                if (e.key == "Enter") {
                                                    verificar();
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={["fa", "lock"]} /></span>
                                        <input
                                            className="form-control"
                                            name="password"
                                            type="password"
                                            autoComplete="on"
                                            placeholder="contraseña"
                                            onChange={changeUser}
                                            onKeyPress={e => {
                                                if (e.key == "Enter") {
                                                    verificar();
                                                }
                                            }}
                                        />
                                    </div>
                                    {!conCuenta &&
                                        <>
                                            <div id="passwordHelpBlock" className="form-text mb-2">
                                                La contraseña debe ser superior a 8 caracteres
                                            </div>
                                            <div>
                                                <div className="input-group">
                                                    <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={["fa", "lock"]} /></span>
                                                    <input
                                                        className="form-control"
                                                        name="password2"
                                                        type="password"
                                                        autoComplete="on"
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
                                        </>
                                    }
                                </form>
                                <div>
                                    <button
                                        className="btn btn-primary mt-3 mb-3"
                                        onClick={() => verificar()}>
                                        {loading ?
                                            <div className="spinner-border spinner-border-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            : conCuenta ? "ingresar" : "Registrarme"}
                                    </button>
                                </div>
                                <div className="modal-footer">
                                    {conCuenta ?
                                        <p>Registrate {" "}<a className="text-primary loginButton" onClick={() => setconCuenta(false)}>aqui</a> </p> :
                                        <p>tienes cuenta? <a className="text-primary loginButton" onClick={() => setconCuenta(true)}>Iniciar sesión</a> </p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


