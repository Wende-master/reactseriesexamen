import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from './../Global';

export default class Menu extends Component {
    state = {
        series: [],
        status: false,

    }

    loadSeries = () => {
        var request = "api/series";
        var url = Global.urlApiSerie + request;
        axios.get(url).then(response => {
            this.setState({
                series: response.data,
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries();
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(90deg, #333, #222)' }}>
                        <div className="container">

                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink to="/" className="nav-link">Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={"/modificar"} className="nav-link">Modificar Personaje</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/createpersonaje" className="nav-link">Crear personaje</NavLink>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Series
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            {this.state.status && this.state.series.map((serie, index) => (
                                                <li key={index}>
                                                    <NavLink to={"/detalleserie/" + serie.idSerie} className="dropdown-item">{serie.nombre}</NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>


                </div>

            </div>
        )
    }
}
