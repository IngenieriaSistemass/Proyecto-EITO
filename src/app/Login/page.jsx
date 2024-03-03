"use client"
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../../firebase";
import Modal from "../components/Modal";


const auth = getAuth(firebaseApp);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");


  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
    } catch (error) {
      setError(error.message);
      console.error("Error al registrar usuario:", error);
      setModalText(error.message);
      setModal(true);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setModalText("Usuario inició sesión correctamente");
      setModal(true);
      // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
    } catch (error) {
      setError(error.message);
      if (error.code === 'auth/invalid-credential') {
        setModalText("Credenciales invalidas");
        setModal(true);
      } else if (error.code === 'auth/wrong-password') {
        setModalText("Contraseña incorrecta");
        setModal(true);
      } else if (error.code === 'auth/user-not-found') {
        setModalText("correo no encontrado");
        setModal(true);
      } else if (error.code === 'auth/too-many-requests') {
        setModalText("Demasiados intentos fallidos, intente más tarde o reinicie su contraseña");
        setModal(true);
      } else {
        setModalText("Error al iniciar sesión");
        setModal(true);
      }
    }
  };

  return (
    <>
      {modal && <Modal Contenido={modalText} cerrar={() => setModal(false)} nameBtn='Aceptar' esError={!modalText.includes('enviado') && !modalText.includes('correctamente')}
      />}
      <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
        <div className="relative mt-12 w-full max-w-lg sm:mt-10">
          <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"
            bis_skin_checked="1"></div>
          <div
            className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
            <div className="flex flex-col p-6">
              <h3 className="text-xl font-semibold leading-6 tracking-tighter">Login</h3>
              <p className="mt-1.5 text-sm font-medium text-white/50">Bienvenido ingresa tus credenciales de acceso
              </p>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={handleSignIn}>
                <div>
                  <div>
                    <div
                      className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                      <div className="flex justify-between">
                        <label
                          className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Correo Electronico</label>
                        <div className="absolute right-3 translate-y-2 text-green-200">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="currentColor" className="w-6 h-6">
                            <path 
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                             />
                          </svg>
                        </div>
                      </div>
                      <input type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    <div
                      className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                      <div className="flex justify-between">
                        <label
                          className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Password</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="password"
                          placeholder="Contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="remember"
                      className="outline-none focus:outline focus:outline-sky-300" />
                    <span className="text-xs">Remember me</span>
                  </label>
                  <a className="text-sm font-medium text-foreground underline" href="/forgot-password">Forgot
                    password?</a>
                </div>
                <div className="mt-4 flex items-center justify-end gap-x-2">
                  <button
                    className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                    type="submit">Log in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>



    </>
  );
}
