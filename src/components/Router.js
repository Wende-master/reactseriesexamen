import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Menu from './Menu'
import Home from './Home'
import DetallesSerie from './DetallesSerie'
import ModificarPersonaje from './ModificarPersonaje'
import CreatePersonaje from './CreatePersonaje'
import Personjaes from './Personajes'


export default class Router extends Component {
    render() {

        function DetallesSerieElement() {
            var { idserie } = useParams();
            return <DetallesSerie idserie={idserie} />;
        }

        function PersonajesElement() {
            var { idserie } = useParams();
            return (<Personjaes idserie={idserie} />)
        }

        return (
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/detalleserie/:idserie" element={<DetallesSerieElement />} />
                    <Route path="/personajes/:idserie" element={<PersonajesElement />} />
                    <Route path="/modificar" element={<ModificarPersonaje />} />
                    <Route path='/createpersonaje' element={<CreatePersonaje />} />
                </Routes>
            </BrowserRouter>

        )
    }
}
