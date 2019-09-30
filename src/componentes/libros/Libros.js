import React from 'react';
import { Link } from 'react-router-dom';
//combine function from left to right
import { compose } from 'redux';
//this connect a component from react with a store from redux 
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; 
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Libros = ({libros, firestore}) => {
    console.log('libros de firestore ', libros);
    if(!libros) return <Spinner/>

    const eliminarLibro = (id) => {
        firestore.delete({
            collection: 'libros',
            doc: id
        });
    }

    return (
        <div className="row">
            <div className="col-12 mb-4">
                <Link to="/libros/nuevo" className="btn btn-success">
                    <i className="fas fa-plus">{' '}
                        Nuevo Libro
                    </i>
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-book">{' '}
                        Libros
                    </i>
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Editorial</th>
                        <th>Existencia</th>
                        <th>Disponibles</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map(libro => (
                        <tr key={libro.id}>
                            <td>{libro.titulo}</td>
                            <td>{libro.ISBN}</td>
                            <td>{libro.editorial}</td>
                            <td>{libro.existencia}</td>
                            <td>{libro.existencia - libro.prestados.length}</td>
                            <td>
                                <Link to={`/libros/mostrar/${libro.id}`} className="btn btn-success btn-block">
                                    <i className="fas fa-angle-double-right">{' '}
                                    Mas información
                                    </i>
                                </Link>
                                <button type="button" className="btn btn-danger btn-block"
                                    onClick={() => eliminarLibro(libro.id)}>
                                    <i className="fas fa-trash-alt">{' '}
                                        Eliminar
                                    </i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Libros.propTypes = {
    firestore: PropTypes.object.isRequired,
    libros: PropTypes.array.isRequired
}
 
export default compose(
    firestoreConnect([{ collection : 'libros'}]),
    connect((state, props) => ({ libros : state.firestore.ordered.libros }))
)(Libros);

//Connecting to a specific collection
//firestoreConnect([{ collection : 'libros'}]),

//Gathering the book collection from the store, that previuosly was extracted from firebase, and saving it into the component's props 
//connect((state, props) => ({ libros : state.firestore.ordered.libros }))
