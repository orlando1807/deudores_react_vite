import { useState, useEffect } from "react";
import Formulario from './components/Formulario'
import Header from './components/Header'
import ListadoDeudores from './components/ListadoDeudores'
function App() {
  const [deudores, setDeudores] = useState([]);
  const [deudor, setDeudor] = useState({});
  const [abonando, setAbonando] = useState(false);

  useEffect(() => {
    const obtenerLS = () => {
      const deudoresLS = JSON.parse(localStorage.getItem("deudores")) ?? [];
      setDeudores(deudoresLS);
    };
    obtenerLS();
  }, []);

  useEffect(() => {
    localStorage.setItem("deudores", JSON.stringify(deudores));
  }, [deudores]);

  const eliminarDeudor = (id)=>{
    const deudoresActualizados = deudores.filter(item=> item.id!==id);
    setDeudores(deudoresActualizados)
  }

  return (
    <div className='container mx-auto mt-10'>
     <Header/>
     <div className="mt-8 md:flex">
      <Formulario
        deudores={deudores}
        deudor={deudor}
        abonando={abonando}
        setDeudores={setDeudores}
        setDeudor={setDeudor}
      />
      <ListadoDeudores
        deudores={deudores}
        setDeudor={setDeudor}
        setDeudores={setDeudores}
        eliminarDeudor={eliminarDeudor}
        setAbonando={setAbonando}
      />
     </div>
    </div>
  )
}

export default App
