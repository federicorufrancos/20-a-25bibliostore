import React, { Component } from 'react';
import { compose } from 'redux';
//this connect a component from react with a store from redux 
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; 
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class EditarSuscriptor extends Component {

    //this are the references to the inputs where is going to sabe the value that user types in
    nombreInput = React.createRef();
    apellidoInput = React.createRef();
    carreraInput = React.createRef();
    codigoInput = React.createRef();

    editarSuscriptor = e => {
        e.preventDefault();
        const suscriptorActualizado = {
            nombre: this.nombreInput.current.value,
            apellido: this.apellidoInput.current.value,
            carrera: this.carreraInput.current.value,
            codigo: this.codigoInput.current.value
        }
        console.log('suscriptorActualizado ', suscriptorActualizado);

        const { suscriptor, history, firestore } = this.props;
        firestore.update({
            collection: 'suscriptores',
            doc: suscriptor.id
        }, suscriptorActualizado).then(history.push('/suscriptores'))


    }

    render() { 
        //uncontroed components: user is able to edit the element
        //controed components: user is unable to edit the element because the content of the element is controlled by react
        const { suscriptor } = this.props;
        if (!suscriptor) return <Spinner/>

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
                        <i className="fas">{''}
                            Editar Suscriptor
                        </i>
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.editarSuscriptor}>
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input type="text" name="nombre" ref={this.nombreInput} placeholder="Nombre del Suscriptor" required defaultValue={suscriptor.nombre} className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Apellido:</label>
                                    <input type="text" name="apellido" ref={this.apellidoInput} placeholder="Apellido del Suscriptor" required defaultValue={suscriptor.apellido} className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Carrera:</label>
                                    <input type="text" name="carrera" ref={this.carreraInput} placeholder="Carrera del Suscriptor" required defaultValue={suscriptor.carrera} className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Código:</label>
                                    <input type="text" name="codigo" ref={this.codigoInput} placeholder="Código del Suscriptor" required defaultValue={suscriptor.codigo} className="form-control"/>
                                </div>
                                <input type="submit" value="Editar Suscriptor" className="btn btn-success"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>    
        );
    } 
}
 
EditarSuscriptor.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [{
        collection: 'suscriptores',
        storeAs : 'suscriptor',
        doc : props.match.params.id
    }]), 
    connect(({ firestore: {ordered}}, props) => ({
        suscriptorView: ordered.suscriptor && ordered.suscriptor[0]
    }))
)(EditarSuscriptor);
