import { useState, useEffect } from "react";
import Error from "./Error";
const Formulario = ({ deudores, deudor, abonando, setDeudores, setDeudor }) => {
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState(0);
  const [motivo, setMotivo] = useState("");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(deudor).length > 0 && !abonando) {
      setNombre(deudor.nombre);
      setMonto(deudor.monto);
      setMotivo(deudor.motivo);
      setFecha(deudor.fecha);
      setDescripcion(deudor.descripcion);
    }
  }, [deudor]);
  // Generar un ID para guardar el deudor por primera vez
  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  };

  const guardarDeudor = (e) => {
    e.preventDefault();
    // Validación de deudor
    if ([nombre, motivo, fecha].includes("")) {
      setError(true);
      return;
    }
    if (monto === 0) {
      setError(true);
      return;
    }
    setError(false);
    // Objeto de deudor
    const objetoDeudor = {
      nombre,
      monto: Number(monto),
      motivo,
      fecha,
      descripcion,
    };
    if (deudor?.id) {
      //Editar deudor
      objetoDeudor.id = deudor.id;
      objetoDeudor.abonos = deudor.abonos;
      const deudoreActualizado = deudores.map((item) =>
        item.id === deudor.id ? objetoDeudor : item
      );
      setDeudores(deudoreActualizado);
      setDeudor({});
    } else {
      objetoDeudor.id = generarId();
      setDeudores([...deudores, objetoDeudor]);
    }
    //Limpiar Formulario
    cleanForm();
  };
  const cleanForm = () => {
    setNombre("");
    setMonto(0);
    setMotivo("");
    setFecha("");
    setDescripcion("");
  };

  return (
    <div className="pt-10 md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-center text-2xl uppercase mb-5">
        Agrega Deudores y <span className="text-blue-500">Administralos</span>
      </h2>
      <form
        onSubmit={guardarDeudor}
        className="bg-white text-lg rounded-xl shadow-lg py-10 px-5 mb-10"
      >
        {error && (
          <Error mensaje={"Todos los campos con * son obligatorios."} />
        )}
        <label
          htmlFor="nombre"
          className="block mt-4 font-bold text-gray-700 uppercase"
        >
          <span className="text-red-600">*</span>Nombre y Apellido
        </label>
        <input
          type="text"
          id="nombre"
          className="w-full p-2 mt-1 placeholder-gray-400 border-2 rounded-xl"
          placeholder="Nombre y Apellido"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label
          htmlFor="monto"
          className="block mt-4 font-bold text-gray-700 uppercase"
        >
          <span className="text-red-600">*</span>Monto
        </label>
        <input
          type="number"
          id="monto"
          className="w-full p-2 mt-1 placeholder-gray-400 border-2 rounded-xl"
          placeholder="Monto Solicitado"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <label
          htmlFor="motivo"
          className="block mt-4 font-bold text-gray-700 uppercase"
        >
          <span className="text-red-600">*</span>Motivo
        </label>
        <input
          type="text"
          id="motivo"
          className="w-full p-2 mt-1 placeholder-gray-400 border-2 rounded-xl"
          placeholder="Motivo"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />
        <label
          htmlFor="fecha"
          className="block mt-4 font-bold text-gray-700 uppercase"
        >
          <span className="text-red-600">*</span>Fecha de Deuda
        </label>
        <input
          id="fecha"
          type="date"
          className="w-full p-2 mt-1 placeholder-gray-400 border-2 rounded-xl"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <label
          htmlFor="descripcion"
          className="block mt-4 font-bold text-gray-700 uppercase"
        >
          Descripción (Saber cuando pagara y terminos)
        </label>
        <textarea
          type="text"
          id="descripcion"
          className="w-full p-2 mt-1 mb-3 placeholder-gray-400 border-2 rounded-xl"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="submit"
          className="bg-blue-600 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-blue-700 cursor-pointer transition-all"
          value={"Agregar Deuda"}
        />
      </form>
    </div>
  );
};

export default Formulario;
