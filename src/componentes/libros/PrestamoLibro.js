import React, { Component } from 'react';
import { compose } from 'redux';
//this connect a component from react with a store from redux 
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; 
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FichaSuscriptor from '../suscriptores/FichaSuscriptor';


class PrestamoLibro extends Component {
    state = { 
        busqueda: '',
        resultado: {},
        noResultado: false
     }

    leerDato = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    solicitarPrestamo = () => {
        const suscriptor = this.state.resultado;

        suscriptor.fecha_solicitud = new Date().toLocaleDateString();

        const { libroView, history, firestore } = this.props;
        
        libroView.prestados.push(suscriptor);

        //the second parameter is the book to update
        firestore.update({
            collection: 'libros',
            doc: libroView.id
        }, libroView).then(history.push('/'));
    }

    buscarAlumno = e => {
        e.preventDefault();
        const { busqueda } = this.state;
        const { firestore } = this.props;
        const coleccion = firestore.collection('suscriptores');
        const consulta = coleccion.where("codigo", "==", busqueda).get();
        consulta.then(resultado => {
            console.log(resultado);
            if (resultado.empty) {
                this.setState({
                    resultado: {},
                    noResultado: true
                });
            } else {
                const datos = resultado.docs[0];
                this.setState({
                    resultado: datos.data(),
                    noResultado: false
                });
            
            }
        })
    }

    render() { 

        const { libroView } = this.props;
        
        if (!libroView) return <Spinner/>

        const { noResultado, resultado } = this.state;
        let fichaAlumno = null, btnSolicitar = null;
        if (!noResultado) {
            fichaAlumno = <FichaSuscriptor 
                                alumno={resultado}
                            />
            btnSolicitar = <button 
                            className="btn btn-primary btn-block" 
                            type="button" 
                            onClick={this.solicitarPrestamo}>Solicitar Prestamo</button>
        }
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
                        <i className="fas fa-book">{''}
                            Solicitar Prestamo : { libroView.titulo }
                        </i>
                    </h2>
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <form onSubmit={this.buscarAlumno} className="mb-4">
                                <legend className="color-primary text-center">
                                    Busca suscriptor por código
                                </legend>
                                <div className="form-group">
                                    <label>Código:</label>  
                                    <input type="text" name="busqueda" 
                                        onChange={this.leerDato}
                                        placeholder="Código del Suscriptor" required 
                                        className="form-control"/>
                                </div>
                                <input type="submit" value="Buscar alumno" className="btn btn-success btn-block"/>
                            </form>
                            {fichaAlumno}
                            {btnSolicitar}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PrestamoLibro.propTypes = {
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
)(PrestamoLibro);