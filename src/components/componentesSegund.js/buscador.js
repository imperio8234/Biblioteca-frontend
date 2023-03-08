import axios from "axios";
import { useEffect, useState, useContext } from "react";
import userContext from "../../context/userContext";
import "../css/buscador.css"
import { Resultados } from "./componenteBuscador/sinResultados";


export const Buscador = ({ inputText, enviBuscar }) => {

//parametros de busqueda
  const [texto, setTexto]=useState("")
  useEffect(()=>{
    function ele(){
      if (enviBuscar) {
        setTexto(inputText);
        
      }
    }
ele()
  }, [enviBuscar, inputText])



  const {token}=useContext(userContext)
    const [obj, setObj] = useState([]);
    const [encontr, setEncontr]=useState(true);

  // se hace la petición a la api
  useEffect(() => {
    if (enviBuscar &&  texto) {
      axios.get(`https://lista-de-tareas-production.up.railway.app/buscar/${texto}`, {
      headers:{Authorization:`Bearer ${token} `}
    }).then(res => {
      if (res) {
        setObj(res.data.resultado)
      } else {
        console.log("no hay archivos");
      }
    }).catch(err => console.log(err))
      
    }
    // eslint-disable-next-line
  }, [texto,token]);

  useEffect(()=>{
    if (obj.length <= 0) {
      setEncontr(false)

      
    } else {
      setEncontr(true)
      
    }

  }, [obj]);


  const eliminar= async(id, name)=>{
    const config={ withCredentials:true}
 await axios.delete(`https://lista-de-tareas-production.up.railway.app/login/home/eliminar/${id}/${name}`, config)
 .then(res=>{
    if (res.data.success) {
      
      }
 })
 .catch(err=>console.log(err))
 };  

      
    return(
        <div className="buscador">
            {
              encontr? obj.map(e=>{
                    return  <div className="card contBuscador" key={e.id} >
                    <img alt={e.nombre} className="card-img-top im" src={"https://lista-de-tareas-production.up.railway.app/"+ e.id + e.nombre}></img>
  
                <div className="card-body">
                   <h5 className="card-title text">{e.nombre}</h5>
                    <p className="card-text">{e.descripcion}.</p>
                    <button onClick={()=>eliminar(e.id, e.nombre)} className="btn btn-primary bot">eliminar</button>
                  </div>
  
                   </div> 
                })
                :<Resultados></Resultados>
                      }       
        </div>
    )
};