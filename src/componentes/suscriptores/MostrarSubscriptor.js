import React from 'react';
import { compose } from 'redux';
//this connect a component from react with a store from redux 
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; 
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//suscriptor is the one defined in the connect
const MostrarSuscriptor  = ({suscriptorView}) => {
    if (!suscriptorView) return <Spinner/>
    console.log('suscriptor: ', suscriptorView);
    
    return (
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to="/suscriptores" className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left">{' '}
                        Volver al Listado
                    </i>
                </Link>
            </div>
            <div className="col-md-6 mb-4">
                <Link to={`/suscriptores/editar/${suscriptorView.id}`} 
                    className="btn btn-primary float-right">
                    <i className="fas fa-pencil-alt"></i>{' '}
                        Editar Suscriptor
                </Link>
            </div>
            <hr className="mx-5 w-100"/>
            <div className="col-12">
                <h2 className="mb-4">
                    {suscriptorView.nombre} {suscriptorView.apellido}
                </h2> 
                <p>
                    <span className="font-weight-bold">
                         Carrera:
                    </span> {' '}
                    {suscriptorView.carrera}
                </p>
                <p>
                    <span className="font-weight-bold">
                         Código:
                    </span> {' '}
                    {suscriptorView.codigo}
                </p>
            </div>
        </div>
    );
}
MostrarSuscriptor.propTypes = {
    firestore: PropTypes.object.isRequired
}
//the firestoreConnect is making the request to get the right suscrptor

export default compose(
    firestoreConnect(props => [{
        collection: 'suscriptores',
        storeAs : 'suscriptor',
        doc : props.match.params.id
    }]), 
    connect(({ firestore: {ordered}}, props) => ({
        suscriptorView: ordered.suscriptor && ordered.suscriptor[0]
    }))
)(MostrarSuscriptor);

// here { firestore: {ordered}, is doing a destructuring of the object that is returned by firestore. Remember that one that saids state.firestore.ordered...  
// ordered.suscriptor is the one renamed in the storeAs instruction  

//getting the suscriber with that specific id
//doc : props.match.params.id