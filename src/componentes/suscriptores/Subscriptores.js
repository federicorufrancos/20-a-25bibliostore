import React from 'react';
import { Link } from 'react-router-dom';
//combine function from left to right
import { compose } from 'redux';
//this connect a component from react with a store from redux 
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; 
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Suscriptores  = ({suscriptores, firestore}) => {
    //firestore contains all the function necesary to update the database
    console.log('suscriptores ', suscriptores);
    
    if (!suscriptores) return <Spinner/>;

    const eliminarSuscriptor = (id) => {
        console.log('Eliminando...');
        //specifing which collection and the id of the element to delete, it will be all the necesary stuff to achive the task
        firestore.delete({
            collection: 'suscriptores',
            doc : id
        });
    }

    return ( 
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link to="/suscriptores/nuevo" className="btn btn-primary"> <i className="fas fa-plus">{''}</i>Nuevo Suscriptor</Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-users">Suscriptores</i>
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                         <th>Nombre</th>
                         <th>Carrera</th>
                         <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {suscriptores.map(suscriptor => (
                        <tr key={suscriptor.id}>
                            <td>{suscriptor.nombre} {suscriptor.apellido}</td>
                            <td>{suscriptor.carrera}</td>
                            <td>
                                <Link to={`/suscriptores/mostrar/${suscriptor.id}`} className="btn btn-success btn-block">
                                    <i className="fas fa-angle-double-right">{''} Más Información</i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-block" 
                                    onClick={() => eliminarSuscriptor(suscriptor.id)}>
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

Suscriptores.propTypes = {
    firestore: PropTypes.object.isRequired, 
    suscriptores: PropTypes.array
}
//setting the collection where I want to make the request
//also here s concatenaing multibles enhacer 
export default compose(
    firestoreConnect([{ collection : 'suscriptores'}]),
    connect((state, props) => ({ suscriptores : state.firestore.ordered.suscriptores }))
)(Suscriptores);

//finally this is connecting the component with the redux store  