import React, { Component } from 'react';
import { compose } from 'redux';
//this connect a component from react with a store from redux 
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; 
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class MostrarLibro extends Component {
    state = {  };

    devolverLibro = codigo => {
        console.log(codigo);
        const libroActualizado = {...this.props.libroView};
        console.log('antes ', libroActualizado.prestados);
        libroActualizado.prestados = libroActualizado.prestados.filter(prestado => prestado.codigo !== codigo);
        console.log('despues ', libroActualizado.prestados);

        const {firestore, history } = this.props;

        firestore.update({
            collection: 'libros',
            doc: libroActualizado.id
        }, libroActualizado).then(history.push('/'));

    }

    render() { 
        const { libroView } = this.props; 
        
        if (!libroView) return <Spinner/>

        let solicitable = null;

        if (libroView.existencia - libroView.prestados.length > 0){
            console.log('hay libros disponibles');
            solicitable = <Link to={`/libros/prestamo/${libroView.id}`} 
                                className="btn btn-success my-3">Solicitar prestamo</Link>
        }

        console.log('libroView ', libroView);
        return (
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to="/" className="btn btn-secondary">{' '}
                        Volver al listado
                    </Link>
                </div>
                <div className="col-md-6 mb-4">
                    <Link to={`/libros/editar/${libroView.id}`} 
                        className="btn btn-primary float-right">
                        <i className="fas fa-pencil-alt">{' '}
                            Editar Libro
                        </i>
                    </Link>
                </div>
                <hr className="mx-5 w-100"/>
                <div className="col-12">
                    <h2 className="mb-4">
                        {libroView.titulo}
                    </h2>
                    <p>
                        <span className="font-weight-bold">
                            Editorial:
                        </span> {' '}
                        {libroView.editorial}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Existencia:
                        </span> {' '}
                        {libroView.existencia}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Disponibles:
                        </span> {' '}
                        {libroView.existencia - libroView.prestados.length}
                    </p>
                    {solicitable}
                </div>
                <h3 className="my-2">Personas que pidieron el libro prestado </h3>
                {libroView.prestados.map(prestamo => (
                    <div key={prestamo.codigo} className="card my-2">
                        <h4 className="card-header">{prestamo.nombre} {prestamo.apellido}</h4>
                        <div className="card-body">
                            <p>
                                <span className="font-weight-bold">
                                    Código:
                                </span>{' '}
                                {prestamo.codigo}
                            </p>
                            <p>
                                <span className="font-weight-bold">
                                    Carrera:
                                </span>{' '}
                                {prestamo.carrera}
                            </p>
                            <p>
                                <span className="font-weight-bold">
                                    Fecha solicitud:
                                </span>{' '}
                                {prestamo.fecha_solicitud}
                            </p>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-success font-weight-bold"
                            onClick={() => this.devolverLibro(prestamo.codigo)}>
                                Realizar devolución
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

MostrarLibro.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [{
        collection: 'libros',
        storeAs: 'libro',
        doc: props.match.params.id
    }]),
    connect(({firestore: {ordered}}, props) => ({
        libroView: ordered.libro && ordered.libro[0]
    }))
)(MostrarLibro);

//this is renaming the result to "libro", because the response will be just one element
//storeAs: 'libro',