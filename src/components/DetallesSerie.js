import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class DetallesSerie extends Component {
  state = {
    detalles: [],
    status: false
  }

  loadDetallesSerie = () => {
    var request = "api/series/" + this.props.idserie;
    console.log(this.props.idserie);
    var url = Global.urlApiSerie + request;
    axios.get(url).then(response => {
      console.log(response);

      this.setState({
        detalles: response.data,
        status: true
      })
    })

  }

  componentDidMount = () => {
    this.loadDetallesSerie();

  }

  componentDidUpdate = (oldProps) => {
    if (oldProps !== this.props) {
      this.loadDetallesSerie();
    }
  }

  render() {
    return (

      <div className='container'>
        <h1>Detalles de Serie</h1>

        {this.state.status == true && (
          <div className="card text-center mt-4">
            <div className="card-header">
              Serie
            </div>
            <div className="card-body">
              <h5 className="card-title">{this.state.detalles.nombre}</h5>
              <img src={this.state.detalles.imagen} className="img-fluid" width="300px" height="auto" alt={this.state.detalles.nombre} />
              <p className="card-text"><b>Puntuación: </b>{this.state.detalles.puntuacion}</p>
              <p className="card-text"><b>Año: </b>{this.state.detalles.anyo}</p>
              
              <NavLink to={"/personajes/" + this.state.detalles.idSerie} className="btn btn-outline-success col-6 mx-auto">
                Personajes
              </NavLink>
            </div>
            <div className="card-footer text-muted">
              <NavLink to={"/"} className='btn btn-outline-primary col-6 mx-auto'>
                Volver
              </NavLink>
            </div>
          </div>
        )}
      </div>

    )
  }
}
