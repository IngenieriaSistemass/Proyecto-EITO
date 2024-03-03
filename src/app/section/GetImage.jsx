"use client"
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Compressor from 'compressorjs';
import { Loader } from '../components/Loader';
import Modal from '../components/Modal';
import axios from 'axios';
import Image from 'next/image';

export function GetImage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [imageFile, setImageFile] = useState(null);


  const formatFileSize = (bytes) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else if (bytes >= 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else {
      return `${bytes} bytes`;
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    setIsLoading(true);
    acceptedFiles.forEach(async (file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        setFileName(file.name);
        setFileType(file.type);

        if (file.type.startsWith('image/')) {
          new Compressor(file, {
            quality: 0.5,
            convertSize: Infinity,
            convertTypes: [],
            success(compressedFile) {
              const compressedReader = new FileReader();
              compressedReader.onload = () => {
                setImageUrl(compressedReader.result);
                setImageFile(compressedFile);
                setFileSize(compressedFile.size);
                setIsLoading(false);
                setModal(true);
                setModalText('Imagen cargada correctamente');
              };
              compressedReader.readAsDataURL(compressedFile);
            },
            error(err) {
              console.error('Error al comprimir la imagen:', err.message);
              setIsLoading(false);
              setModal(true);
              setModalText('Error al comprimir la imagen');
            },
          });
        } else if (file.type === 'application/pdf') {
          setImageUrl("https://cdn-icons-png.flaticon.com/512/337/337946.png");
          setFileSize(file.size);
          setIsLoading(false);
          setModal(true);
          setModalText('Archivo cargado correctamente');

        } else {
          console.log('Tipo de archivo no soportado:', file.type);
          setIsLoading(false);
          setModal(true);
          setModalText('Tipo de archivo no soportado');
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);

  const submitimg = async (e) => {
    e.preventDefault();

    if (!imageFile) return;

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const res = await axios.post('/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Respuesta del servidor:', res);

      if (res.status === 200) {
        setModal(true);
        setModalText('Archivo enviado correctamente');

        setIsLoading(false);
      } else {
        console.error('Error al enviar el archivo', res);
        setIsLoading(false);
        setModal(true);
        setModalText('Error al enviar el archivo');
      }
    } catch (error) {
      console.error('Error al enviar la imagen:', error);
      setIsLoading(false);
      setModal(true);
      setModalText('Error al enviar la imagen');
    }
  };


  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf', '.PDF']
    },
  });

  return (
    <>
      {modal && <Modal Contenido={modalText} cerrar={() => setModal(false)} nameBtn='Aceptar' esError={!modalText.includes('enviado') && !modalText.includes('correctamente')}
      />}

      <form className='flex flex-col items-center justify-center w-full gap-4'>
        <div {...getRootProps()} className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2  border-dashed rounded-lg cursor-pointer  dark:hover:bg-bray-800 bg-primary border-[#25201C]">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-white">
                <span className="font-semibold">Click para subir</span> o arrastra el archivo aquí
              </p>
              <p className="text-xs text-white">PDF, PNG, JPG (Máx. 800x400px)</p>
            </div>
          </label>
          <input {...getInputProps()} id="dropzone-file" type="file" className="" />
        </div>
        <button className='bg-primary px-10 py-3 text-balance rounded-xl font-bold hover:bg-primary/75 transition' type="submit" onClick={submitimg}

        >ENVIAR</button>
      </form>
      <div className="w-full flex justify-center mt-10"> <Loader isLoading={isLoading} /></div>
      {imageUrl && (
        <div className="mt-4 flex flex-row w-full max-sm:flex-col justify-center justify-items-center items-center gap-10 border-primary">
          <div className='flex flex-col w-full ml-20 max-sm:ml-0 max-sm:text-center animate-fade-in animate-delay-500'>
            <h2 className='font-bold text-secondary text-2xl'>Archivo comprimido:</h2>
            <p className='font-medium text-primary text-xl'>Nombre: {fileName}</p>
            <p className='font-medium text-primary text-xl'>Tipo: {fileType}</p>
            {fileSize && <p className='font-bold text-primary text-xl '>Tamaño: {formatFileSize(fileSize)}</p>}
          </div>
          {imageUrl.endsWith('.pdf') ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke="#2c3e50" fill="none">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
              <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
              <path d="M17 18h2" />
              <path d="M20 15h-3v6" />
              <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
            </svg>
          ) : (
            <Image className='animate-fade-in animate-delay-500 w-1/3 ' src={imageUrl} alt="Archivo comprimido" width={30} height={30} />
          )}
        </div>
      )}
    </>
  );
}
