import React, { useEffect, useState } from "react";
export default function App(props) {
  //STATE
  const [state, setState] = useState({
    title:'',
    description:'',
    tareas:[],
    _id:''
  });
  
  //RENDER DATA
  const getFetch = ()=>{
      fetch('/tareas')
      .then(res=> res.json())
      .then(data =>{
        setState({...state,
          tareas:data
        })
      })
  }
    useEffect(()=>{
      getFetch()
  },[])

   //CAMBIO
   const Cambio = (e)=>{
    const {name, value} = e.target;
    setState({...state,
      [name]:value
    })
}

//SUBMIITT
const submit= (e)=>{
  if(state._id){
      fetch(`/tareas/${state._id}`,{
        method: 'PUT',
        headers:{
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(state)
      })
      .then(res =>console.log(res))
      .catch(err =>console.log(err))
      setState({
        ...state,
        title:'',
        description:'',
        _id:''
      })
      getFetch();
      
  }else{
  fetch('/tareas', {
    method:'POST',
    body: JSON.stringify(state),
    headers:{
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  })
  .then(res=>res.json())
  .then(data =>console.log(data))
  .catch(err=>console.log(err))
  setState({
    ...state,
    title:'',
    description:'',
    _id:''
  })
  getFetch()
  }
}


  //ADD
  const clickSend = () =>{
    getFetch()
  }

  //EDTI
  const clickEdit = (id) =>{
      fetch(`/tareas/${id}`)
      .then(res =>res.json())
      .then(data =>{
        setState({
          ...state,
          title:data.title,
          description:data.description,
          _id:data._id
        })
      })
      .catch(err=>console.log(err))
  }
 

  //DETETE
  const clickDelete = (id)=>{
    if(confirm('Estas seguro de eliminar esta tarea?')){
    fetch(`/tareas/${id}`,{
      method:'DELETE',
      headers:{
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res =>console.log(res))
    .catch(err =>console.log(err))
    }
    setState({
      ...state,
      title:'',
      description:'',
      _id:''
    })
    getFetch()
  }
  return (
    <div>
      <nav className="bg-info bg-gradient p-3">
        <div className="container">
          <a className="text-white" href="/">
            <h2>MERN</h2>
          </a>
        </div>
      </nav>
      <main>
        <div className="container-fluid">
          <div className="row col-5 m-auto">
            <div className="col-12">
              <form onSubmit={submit} className="form-control my-5">
                <label htmlFor="title">Title</label>
                <input value={state.title} onChange={Cambio}
                  className="form-control my-3"
                  type="text"
                  name="title"
                  id="title"
                />
                <label htmlFor="description">Description</label>
                <textarea value={state.description} onChange={Cambio} 
                  className="form-control my-3"
                  name="description"
                  id="description"
                ></textarea>
                {/*BOTON SEND*/}
                <button onClick={clickSend} type="submit" className="btn btn-success">{state._id ? 'UPDATE' : 'SEND'}</button>
              </form>
            </div>
          </div>

            <div className="row col-8 m-auto">
              <div className="col-12">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">description</th>
                      <th scope="col">Edit</th>
                      <th scope="col">delete</th>
                    </tr>
                  </thead>
                  <tbody>
                      {state && state.tareas.map((e,indexOf)=>{
                        return(
                          <tr key={e._id}>
                                <th className="scope">{indexOf+1}</th>
                                <td>{e.title}</td>
                                <td>{e.description}</td>
                                <td><button onClick={()=>clickEdit(e._id)} className='btn btn-success'>Edit</button></td>
                                <td><button onClick={()=> clickDelete(e._id)} className='btn btn-warning'>Delete</button></td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          
        </div>
      </main>
      
    </div>
  );
}
