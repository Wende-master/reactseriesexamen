import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

export default class CreatePersonaje extends Component {

  state = {
    status: false
  }

  cajaId = React.createRef();
  cajaNombre = React.createRef();
  cajaImagen = React.createRef();
  cajaIdSerie = React.createRef();

  selectSerie = () => {
    
  }

  insertarPersonaje = (e) => {
    e.preventDefault();
    var id = parseInt(this.cajaId.current.value);
    var nombre = this.cajaNombre.current.value;
    var imagen = this.cajaImagen.current.value;
    var idSerie = parseInt(this.cajaIdSerie.current.value);

    if (!id || !nombre || !imagen || !idSerie) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
      });
      return null;
    }
    var personaje = {
      id: id,
      nombre: nombre,
      imagen: imagen,
      idSerie: idSerie
    }
    console.log(personaje);

    var request = "api/personajes";
    var url = Global.urlApiSerie + request;
    axios.post(url, personaje).then(response => {
      console.log("respuesta", response);

      Swal.fire({
        icon: 'success',
        title: `${personaje.nombre}` + " fue añadido con éxito",
        showConfirmButton: false,
        timer: 2000
      });

      this.setState({
        status: true
      })

      setTimeout(() => {
      }, 2000);

    }).catch((err) => {
      console.log('ERROR');
    })

  }

  render() {
    return (
      <div className="container">
        {
          this.state.status == true &&
          <Navigate to='/' />
        }
        <h1 className="text-white">Crear personaje</h1>
        <form onSubmit={this.insertarPersonaje}>
          <div className="mb-3">
            <label htmlFor="id" className="form-label" style={{ color: 'black', fontSize: '20px' }}><strong>ID:</strong></label>
            <input type="number" id="id" ref={this.cajaId} placeholder='ID' className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="nombre" className="form-label" style={{ color: 'black', fontSize: '20px' }}><strong>Nombre de Personaje:</strong></label>
            <input type="text" id="nombre" ref={this.cajaNombre} placeholder='Nombre' className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="imagen" className="form-label" style={{ color: 'black', fontSize: '20px' }}><strong>Imagen:</strong></label>
            <input type="file" id="imagen" ref={this.cajaImagen} placeholder='Imagen' className="form-control" />

          </div>

          <div className="mb-3">
            <label htmlFor="idSerie" className="form-label" style={{ color: 'black', fontSize: '20px' }}><strong>Id serie:</strong></label>
            <input type="text" id="idSerie" ref={this.cajaIdSerie} placeholder='idSerie' className="form-control" />
          </div>

          <button className="btn btn-success">Insertar</button>
        </form>
      </div>
    )
  }
}
