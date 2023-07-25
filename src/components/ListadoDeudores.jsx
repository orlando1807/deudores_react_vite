import React from "react";
import Deudor from "./Deudor";

const ListadoDeudores = ({
  deudores,
  setDeudor,
  setDeudores,
  eliminarDeudor,
  setAbonando,
}) => {
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {deudores && deudores.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado Deudores</h2>
          <p className="text-2xl mt-5 mb-10 text-center">
            Administra tus {""}
            <span className="text-blue-500 font-bold">Deudores</span>
          </p>
          {deudores.map((deudor) => (
            <Deudor
              deudor={deudor}
              deudores={deudores}
              key={deudor.id}
              setDeudor={setDeudor}
              eliminarDeudor={eliminarDeudor}
              setAbonando={setAbonando}
              setDeudores={setDeudores}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay Deudores</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comenzar agregando deudores {""}
            <span className="text-blue-500 font-bold">
              y aparecerán en este lugar
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default ListadoDeudores;
