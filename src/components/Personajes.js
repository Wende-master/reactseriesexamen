import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
export default class Personajes extends Component {
  state = {
    personajes: [],
    status: false
  }

  loadPersonejes = () => {
    var request = "api/series/personajesserie/" + this.props.idserie;
    console.log(this.props.idserie);

    var url = Global.urlApiSerie + request;
    axios.get(url).then(response => {
      console.log(response);
      this.setState({
        personajes: response.data,
        status: true
      })
    })

  }

  componentDidMount = () => {
    this.loadPersonejes();
  }



  render() {
    return (
      <div className="jugadores-container">
        <div className="overlay">
          <h1 className='text-center'>Personajes</h1>
          <NavLink to={'/detalleserie/' + this.props.idserie} className="btn btn-outline-danger col-6 mx-auto">
            Volver
          </NavLink>
          {this.state.status && (
            <div className="jugadores-list">
              {this.state.personajes.map((personaje, index) => (
                <div className="jugador-card" key={index}>
                  <h2>{personaje.nombre}</h2>
                  <img src={personaje.imagen} style={{width:"400px", height:"auto"}} alt={personaje.nombre} />
             
                </div>
              ))}
            </div>
          )}</div>
      </div>
    )
  }
}
