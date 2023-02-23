export const  Videos=({ id, nombre, descripcion, eliminar })=>{
    const eli=()=>{
        eliminar(id, nombre)

    };
    return(
        <div>
             <div className="card cont" >
                                 <video  className="card-img-top im" src={"http://localhost:4000/"+ id + nombre} controls></video>
               
                             <div className="card-body">
                                <h5 className="card-title">{nombre}</h5>
                                 <p className="card-text">{descripcion}.</p>
                                 <button onClick={eli} className="btn btn-primary bot">eliminar</button>
                               </div>
               
                                </div> 
        </div>
    )
}