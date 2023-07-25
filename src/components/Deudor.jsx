import { useEffect, useState } from "react";

const Deudor = ({
  deudor,
  deudores,
  setDeudor,
  eliminarDeudor,
  setAbonando,
  setDeudores,
}) => {
  const { nombre, monto, motivo, fecha, descripcion, id, abonos = 0 } = deudor;
  const [stateAbonar, setStateAbonar] = useState(false);
  const [abonar, setAbonar] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(monto - abonos);
  }, [abonos, monto]);

  const clickAbonar = () => {
    if (stateAbonar) {
      const deudorActualizado = {
        nombre,
        monto,
        motivo,
        fecha,
        descripcion,
        id,
        abonos: Number(abonos) + Number(abonar),
      };
      const deudoreActualizado = deudores.map((item) =>
        item.id === id ? deudorActualizado : item
      );
      setDeudores(deudoreActualizado);
      setStateAbonar(false);
      setAbonando(false);
    } else {
      setAbonar(0);
      setAbonando(true);
      setStateAbonar(true);
    }
  };
  return (
    <div className="mx-5 bg-white shadow-md px-5 my-10 py-5 rounded-xl">
      <div className="flex">
        <p className="font-bold uppercase">
          Nombre: {""}
          <span className="font-normal normal-case">{nombre}</span>
        </p>
      </div>
      <div className="flex">
        <p className="mt-2 w-1/2 font-bold uppercase">
          Monto: {""}
          <span className="font-normal normal-case">{monto}</span>
        </p>
        <p className="mt-2 w-1/2 font-bold uppercase">
          Abonos: {""}
          <span className="font-normal normal-case">{abonos}</span>
        </p>
      </div>
      <p className="w-1/3 mt-3 font-bold uppercase">
        Total: {""}
        <span className="font-normal normal-case">{total}</span>
      </p>
      <div className="flex mt-2">
        <p className="w-1/2 font-bold uppercase">
          Motivo: {""}
          <span className="font-normal normal-case">{motivo}</span>
        </p>
      </div>
      <div className="flex mt-2">
        <p className="w-1/2 font-bold uppercase">
          Fecha: {""}
          <span className="font-normal normal-case">{fecha}</span>
        </p>
      </div>
      <p className="mt-2 font-bold uppercase">
        Descripción: {""}
        <span className="font-normal normal-case">{descripcion}</span>
      </p>
      {stateAbonar && (
        <div>
          <label
            htmlFor="abono"
            className="block mt-4 font-bold text-gray-700 uppercase"
          >
            <span className="text-red-600"></span>Abono
          </label>
          <input
            type="number"
            id="abono"
            className="w-full p-2 mt-1 placeholder-gray-400 border-2 rounded-xl"
            placeholder="Abono realizado"
            value={abonar}
            onChange={(e) => setAbonar(e.target.value)}
          />
        </div>
      )}
      <div className="flex mt-10">
        <button
          type="button"
          className="w-1/2 py-2 px-6 mx-2 bg-green-600 hover:bg-green-700 text-white font-bold uppercase rounded-lg"
          onClick={clickAbonar}
        >
          Abonar
        </button>
        <button
          type="button"
          className="w-1/2 py-2 px-6 mx-2 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase rounded-lg"
          onClick={() => setDeudor(deudor)}
        >
          Editar
        </button>
      </div>
      <div className="flex justify-end mt-2">
        <button
          type="button"
          className="py-2 px-6 mx-2 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
          onClick={() => eliminarDeudor(id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Deudor;
