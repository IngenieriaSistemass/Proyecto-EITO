import PropTypes from "prop-types";

function Modal({ Contenido, cerrar, nameBtn, esError}) {
  // Determinar el color y el icono basado en si es un error o no
  const color = esError ? "red" : "green";
  const icono = esError ? (
    <svg
      className="mx-auto mb-4 text-red-500 w-12 h-12 dark:text-red-500"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M10 10l4 4m0 -4l-4 4" />
    </svg>
  ) : (
    <svg
      className="mx-auto mb-4 text-green-500 w-12 h-12 dark:text-green-500"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
  );

  return (
    <>
      <div className="w-full bg-black/40 h-screen  z-50 flex justify-center items-center fixed ">
        <div className="w-full p-4 max-w-md animate-fade-in ">
          <div className="relative rounded-lg shado bg-gray-700">
            <button
              onClick={cerrar}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">cerrar</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              {icono}
              <h3 className={`mb-5 text-lg font-normal text-${color}-500 dark:text-${color}-400`}>
                {Contenido}
              </h3>
              <button
                onClick={cerrar}
                data-modal-hide="popup-modal"
                type="button"
                className={`text-white bg-${color}-600 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 dark:focus:ring-${color}-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
              >
                {nameBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;

Modal.propTypes = {
  Contenido: PropTypes.string.isRequired,
  cerrar: PropTypes.func.isRequired,
  nameBtn: PropTypes.string.isRequired,
  esError: PropTypes.bool, // Nuevo prop para indicar si es un error o no
};

Modal.defaultProps = {
  esError: false,
};
