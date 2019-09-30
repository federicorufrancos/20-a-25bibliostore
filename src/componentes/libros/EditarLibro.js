import React, { Component } from 'react';
import { compose } from 'redux';
//this connect a component from react with a store from redux 
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; 
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class EditarLibro extends Component {
    
    tituloInput = React.createRef();
    ISBNInput = React.createRef();
    editorialInput = React.createRef();
    existenciaInput = React.createRef();

    editarLibro = e => {   
        e.preventDefault();
        const libroActualizado = {
            titulo: this.tituloInput.current.value,
            ISBN: this.ISBNInput.current.value,
            editorial: this.editorialInput.current.value,
            existencia: this.existenciaInput.current.value,
        }
        console.log('libroActualizado ', libroActualizado);

        const { firestore, history, libroView } = this.props;
        firestore.update({
            collection: 'libros',
            doc: libroView.id
        }, libroActualizado).then(history.push('/'))
    }

    render() { 
        console.log('entra a editar libro');

        const { libroView } = this.props;
        if (!libroView) return <Spinner/>

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
                            Editar Libro
                        </i>
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.editarLibro}>
                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input type="text" name="titulo" 
                                        ref={this.tituloInput} 
                                        placeholder="Nombre del Suscriptor" required 
                                        defaultValue={libroView.titulo} 
                                        className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Editorial:</label>
                                    <input type="text" name="titulo" 
                                        ref={this.editorialInput} 
                                        placeholder="Editorial del libro" required 
                                        defaultValue={libroView.editorial} className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>ISBN:</label>
                                    <input type="text" name="ISBN" 
                                        ref={this.ISBNInput} 
                                        placeholder="ISBN del libro" required 
                                        defaultValue={libroView.ISBN} className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Existencia:</label>
                                    <input type="text" name="existencia"
                                        ref={this.existenciaInput} 
                                        placeholder="Cantidad de libros en existencia" required 
                                        defaultValue={libroView.existencia} className="form-control"/>
                                </div>
                                <input type="submit" value="Editar Libro" className="btn btn-success"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditarLibro.propTypes = {
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
)(EditarLibro);