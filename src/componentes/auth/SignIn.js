import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase'; 
import PropTypes from 'prop-types';
import Error from '../layout/Error';
import Swal from 'sweetalert2';

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        repetirPassword: '', 
        error: false,
        mensaje: ''
    }

    crearCuenta = e => {
        e.preventDefault();
        if (this.state.email === '' || this.state.password === '' || this.state.repetirPassword === '') {
            console.log('campos incompletos');
            this.setState({error: true});
            this.setState({mensaje: 'Todos los campos son obligatorios'});
            return;
        } else if (this.state.password !== this.state.repetirPassword) {
            console.log('contraseñas no coinciden');
            this.setState({error: true});
            this.setState({mensaje: 'Las contraseñas no coinciden'});
            return;
        }
        this.setState({
            error: false,
            mensaje: ''
        });
        const { firebase, history } = this.props;
        const  { email, password } = this.state;
        
        firebase.createUser(
            {email, password}
        )
        .then(resultado => {
            console.log('resultado ', resultado)
            Swal.fire(
                'Good job!',
                'Usuario creado con exito',
                'success'
              )
            history.push('/');
        })
        .catch(error => console.log('error ', error ));
    }
    
    leerDatos = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    render() { 
        return ( 
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card-body">
                        <h2 className="text-center py-4">
                            <i className="fas fa-lock">
                                {' '} Sign In
                            </i>
                        </h2>   
                        {this.state.error ? ( <Error mensaje={this.state.mensaje} /> ) : <div className="my-6"></div>}
                        <form onSubmit={this.crearCuenta} noValidate>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" className="form-control" name="email" required value={this.state.email} onChange={this.leerDatos} />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="password" className="form-control" name="password" required value={this.state.password} onChange={this.leerDatos} />
                            </div>
                            <div className="form-group">
                                <label>Repetir password:</label>
                                <input type="password" className="form-control" name="repetirPassword" required value={this.state.repetirPassword} onChange={this.leerDatos} />
                            </div>
                            <input type="submit" value="Crear cuenta" className="btn btn-success btn-block"/>
                        </form>   
                    </div>
                </div>
            </div>
        );
    }
}

SignIn.propTypes = {
    firebase : PropTypes.object.isRequired
}

//here I leaving enabled all the methods from firebaseConnect t be available in the Login component
//firebaseconnect is a high order component
export default firebaseConnect()(SignIn);