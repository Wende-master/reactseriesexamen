import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';


export default class ModificarPersonaje extends Component {

    cajaId = React.createRef();
    cajaIdSerie = React.createRef();

    state = {
        series: [],
        personajes: [],
        selectedSeriesId: false,
        selectedPersonajeId: false,
        modificado: false
    }

    loadSeries = () => {
        var request = "api/series";
        var url = Global.urlApiSerie + request;
        axios.get(url).then(response => {
            //console.log(response);

            this.setState({
                series: response.data,
                selectedSeriesId: true
            })
        })
    }

    loadPersonajes = () => {
        var request = "api/personajes";
        var url = Global.urlApiSerie + request;
        axios.get(url).then(response => {
            this.setState({
                personajes: response.data,
                selectedPersonajeId: true
            })
        })
    }

    modificar = (e) => {
        e.preventDefault();
        var id = parseInt(this.cajaId.current.value);
        var idSerie = parseInt(this.cajaIdSerie.current.value);

        console.log(id, idSerie);



        var request = "api/personajes/" + idSerie + "/" + id;
        console.log(request);
        var url = Global.urlApiSerie + request;
        axios.put(url).then(response => {
            this.setState({
                modificado: true,
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se actualizó correctamente',
                showConfirmButton: false,
                timer: 1000

            })


        })


    }

    componentDidMount = () => {
        this.loadSeries();
        this.loadPersonajes();
    }


    render() {
        return (
            <div className='container'>

                {
                    this.state.modificado == true &&
                    (
                        <Navigate to={'/'} />
                    )
                }

                <form onSubmit={this.modificar} className="pt-4">

                    <div className="col">

                        <button className="btn btn-primary"> Guardar </button>

                    </div>

                    <div className="row g-3 pt-5">

                        <div className="col">

                            <label htmlFor='series'>Serie:</label>

                            <select id='series' ref={this.cajaId} className="form-control">

                                {

                                    this.state.selectedSeriesId == true &&

                                    (

                                        this.state.series.map((serie, index) => {

                                            return (<option key={index} value={serie.idSerie}>{serie.nombre}</option>)

                                        })

                                    )

                                }

                            </select>

                        </div>

                        <div className="col">

                            <label htmlFor='series'>Personajes:</label>

                            <select id='series' ref={this.cajaIdSerie} className="form-control">

                                {

                                    this.state.selectedPersonajeId == true &&

                                    (

                                        this.state.personajes.map((personaje, index) => {

                                            return (<option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>)

                                        })

                                    )

                                }

                            </select>

                        </div>

                    </div>

                </form>

            </div>
        )
    }
}
