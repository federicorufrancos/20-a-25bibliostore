import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase'; 
import PropTypes from 'prop-types';

class NuevoLibro extends Component {
    state = {
        titulo: '',
        editorial: '',
        ISBN: '',
        existencia: '',
        prestados: []
     }

     leerDato = e => {
         this.setState({
             [e.target.name]: e.target.value
         });
     }

    agregarLibro = e => {
        e.preventDefault();
        const nuevoLibro = this.state;
        console.log(nuevoLibro);
        const { firestore, history } = this.props;
        firestore.add({ collection: 'libros' }, nuevoLibro)
            .then(() => history.push('/'));
    }

    render() { 
        return (
            <div class="row">
                <div class="col-12 mb-4">
                    <Link to={'/suscriptores'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left">{''}</i>
                        Volver al Listado 
                    </Link>
                </div>
                <div class="col-12">
                    <h2>
                        <i class="fas fa-book">{' '}
                        Nuevo Libro
                        </i>
                    </h2>
                    <div class="row justify-content-center">
                        <div class="col-md-8 mt-5">
                            <form onSubmit={this.agregarLibro}>
                                <div class="form-group">
                                    <label>Titulo:</label>
                                    <input type="text" class="form-control"
                                        name="titulo"
                                        placeholder="Titulo o Nombre de Libro"
                                        required
                                        value={this.state.titulo}
                                        onChange={this.leerDato}
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Editorial:</label>
                                    <input type="text" class="form-control"
                                        name="editorial"
                                        placeholder="Editorial de Libro"
                                        required
                                        value={this.state.editorial}
                                        onChange={this.leerDato}
                                    />
                                </div>
                                <div class="form-group">
                                    <label>ISBN:</label>
                                    <input type="text" class="form-control"
                                        name="ISBN"
                                        placeholder="ISBN de Libro"
                                        required
                                        value={this.state.ISBN}
                                        onChange={this.leerDato}
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Existencia:</label>
                                    <input type="number" class="form-control"
                                        min="0"
                                        name="existencia"
                                        placeholder="Cantidad en existencia"
                                        required
                                        value={this.state.existencia}
                                        onChange={this.leerDato}
                                    />
                                </div>
                                <input type="submit" value="Agregar Libro" class="btn btn-success"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         );
    }

}
 
NuevoLibro.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()( NuevoLibro );