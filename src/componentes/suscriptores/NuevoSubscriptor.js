import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase'; 
import PropTypes from 'prop-types';

class NuevoSuscriptor extends Component {
    state = { 
        nombre: '',
        apellido: '',
        carrera: '',
        codigo: ''
    }

    //e contains data about the input been filled in and the data being used  
    leerDato = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    agregarSuscriptor = e => {
        e.preventDefault();
        const nuevoSuscriptor = this.state;
        const { firestore, history } = this.props;
        //here I'm saving an element inside the firestore database
        firestore.add({ collection: 'suscriptores' }, nuevoSuscriptor)
            .then(() => history.push('/suscriptores') );
    }

    render() { 
        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/suscriptores'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left">{''}</i>
                        Volver al Listado 
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user-plus">{''}
                            Nuevo Suscriptor
                        </i>
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.agregarSuscriptor}>
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input type="text" name="nombre" placeholder="Nombre del Suscriptor" required onChange={this.leerDato} value={this.state.nombre} className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Apellido:</label>
                                    <input type="text" name="apellido" placeholder="Apellido del Suscriptor" required onChange={this.leerDato} value={this.state.apellido} className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Carrera:</label>
                                    <input type="text" name="carrera" placeholder="Carrera del Suscriptor" required onChange={this.leerDato} value={this.state.carrera} className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Código:</label>
                                    <input type="text" name="codigo" placeholder="Código del Suscriptor" required onChange={this.leerDato} value={this.state.codigo} className="form-control"/>
                                </div>
                                <input type="submit" value="Agregar Suscriptor" className="btn btn-success"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NuevoSuscriptor.propTypes = {
    firestore: PropTypes.object.isRequired
}

//firestoreConnect is a high order component
//there is no need to concatenate enhacer so I don't use compose
export default firestoreConnect()( NuevoSuscriptor );
