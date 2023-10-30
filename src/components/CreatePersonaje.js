import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

export default class CreatePersonaje extends Component {

  state = {
    status: false,
    series: [],
    statusSerie: false
  }

  cajaNombre = React.createRef();
  cajaImagen = React.createRef();
  cajaIdSerie = React.createRef();



  insertarPersonaje = (e) => {
    e.preventDefault();
    var request = "api/personajes";
    var url = Global.urlApiSerie;

    var nombre = this.cajaNombre.current.value;
    var imagen = this.cajaImagen.current.value;
    var idSerie = parseInt(this.cajaIdSerie.current.value);

    if (!nombre || !imagen || !idSerie) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
      });
      return null;
    }

    var personaje = {
      idPersonaje: 0,
      nombre: nombre,
      imagen: imagen,
      idSerie: idSerie
    }
    console.log(personaje);

    axios.post(url + request, personaje).then((response) => {
      this.setState({ status: true });
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

  loadSeries = () => {
    var request = "api/series";
    var url = Global.urlApiSerie;

    axios.get(url + request).then((response) => {
      console.log(response);

      this.setState({
        series: response.data,
        statusSerie: true
      })
    })
  }

  componentDidMount = () => {
    this.loadSeries();
  }

  render() {
    return (
      <div className="container pt-5" >
        {
          this.state.status == true &&
          (
            <Navigate to="/" />
          )
        }
        < h1 > Crear Personaje</h1><hr />
        <form onSubmit={this.insertarPersonaje}>
          <div className="row g-3">
            <div className="col">
              <label htmlFor='nombre'>Nombre:</label>
              <input ref={this.cajaNombre} type="text" className="form-control" placeholder="nombre.." />
            </div>
            <div className="col">
              <label htmlFor='imagen'>Imagen:</label>
              <input ref={this.cajaImagen} type="file" className="form-control" placeholder="imagen.." />
            </div>
            <div className="col">
              <label htmlFor='series'>Serie:</label>
              <select id='series' ref={this.cajaIdSerie} className="form-control">
                {
                  this.state.statusSerie == true &&
                  (
                    this.state.series.map((serie, index) => {
                      return (<option key={index} value={serie.idSerie}>{serie.nombre}</option>)
                    })
                  )
                }
              </select>
            </div>
          </div>
          <button className="btn btn-outline-success"> Guardar </button>
        </form>
      </div >
    )
  }

}
