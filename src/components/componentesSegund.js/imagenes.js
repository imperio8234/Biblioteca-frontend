import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../css/modalStyle.css";


export const Imagenes=({ id, nombre, descripcion, eliminar })=>{
    useEffect(()=>{
        ReactModal.setAppElement("body")

    },[])

    const [modal,setModal]=useState(false)

    const modalOpen=()=>{
        setModal(true);
    };

    const modalClose=()=>{
        setModal(false)
    };
    const name=nombre.split(".")[0];

    return(
        <div>
            <div className="card cont" >
                  <img alt={nombre} onClick={modalOpen} className="card-img-top im" src={"https://lista-de-tareas-production.up.railway.app/"+ id+ nombre}></img>

              <div className="card-body">
                 <h5 className="card-title text">{name}</h5>
                  <p className="card-text">{descripcion}.</p>
                  <button onClick={()=>eliminar(id, nombre)} className="btn btn-primary bot">eliminar</button>
                </div>

                 </div> 
                 <ReactModal isOpen={modal}  onRequestClose={modalClose} className="modContenedor" >
                    <button className="botonModal" onClick={modalClose}>cerrar</button>
                    <div className="conModal">
                        
                        <img alt={nombre}  className="card-img-top mod" src={"https://lista-de-tareas-production.up.railway.app/"+ id+ nombre}></img>
                    </div>
                    
                 </ReactModal>
        </div>
    )

};