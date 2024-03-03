
"use client"
import Link from 'next/link';
import { Comprimido } from './components/Comprimido';
import LetterEncrypt from './components/LetterEncrypt.jsx';


export default function Home() {

  return (
    <>
      <main className="space h-screen w-full flex justify-center items-center p-10 max-sm:flex-col gap-y-10 ">
        <div className="flex flex-col gap-y-5 w-2/3 max-sm:w-full">
          <h1 className=" text-white/80 text-5xl font-extrabold animate-slide-in-right">PROYECTO</h1>
          <LetterEncrypt
            word='EITO'
            mleftinicial={0}
            transicionTime={2}
            tickCambioletra={150}
          ></LetterEncrypt>
          <p className='text-balance text-white/40'>EITO es una plataforma web que permite cargar archivos de diversos formatos y comprimirlos para facilitar su manejo. Además, ofrece una función básica de gestión de archivos, donde los usuarios pueden ver información como el nombre, tipo y tamaño de los archivos, así como descargar o eliminarlos.</p>
          <Link href='/Login' className='text-balance bg-white font-semibold py-2 px-4 rounded text-center w-36 text-black hover:bg-white/70'>
            Inicia sesion
          </Link>
          
          

        </div>
        <div className="w-1/2 max-sm:w-full">
          <Comprimido />

        </div>

      </main>
    </>


  );
}