import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/auth/actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      email: '',
      password: '',
      new_password: false,
      reset: false,
    };
  }

  componentDidMount() {
    this.setState({
      email: this.props.auth.username,
      password: this.props.auth.password,
      new_password: this.props.auth.new_password,
      reset: this.props.auth.reset,
    })
  }

  handleSignIn = this.handleSignIn.bind(this);
  handleSignIn(e) {
    e.preventDefault();
    const { email, password, new_password, reset } = this.state;

    console.log(email, password, new_password, reset)

    this.props.dispatch(fetchUser({ email, password, new_password, reset }))
  }

  handleChange(column, value) {
    const newState = {};
    newState[column] = value;
    this.setState(newState);
  }

  forgetPassword = this.forgetPassword.bind(this)
  forgetPassword(e){
    e.preventDefault();
    console.info('Forgot password logic needs a forgotPassword call to AWS Cognito API !');
  }

  render() {
    const { auth } = this.props;
    const { email, password, new_password, reset } = this.state;

    let extraFields = '';

    let newPasswordField = <input type="password" placeholder="Nouveau mot de passe" value={(new_password !== false) ? new_password : '' } onChange={(e) => this.handleChange('new_password', e.target.value)} />;
    if( this.props.auth.newPasswordRequired === true ){
      extraFields = newPasswordField;
    }

    let resetPasswordField = <input type="text" placeholder="Reset code" value={(reset !== false) ? reset : ''} onChange={(e) => this.handleChange('reset', e.target.value)}/>; 
    if( this.props.auth.resetPassword === true ){
      extraFields = [newPasswordField, resetPasswordField];
    }

    return (
      <div className="container">
        <h1>Cognito User Pool Login</h1>

        {auth.error && <p className="error">{auth.error}</p>}
        <form className="form" onSubmit={(e) => this.handleSignIn(e)}>
          <input type="text" placeholder="Username" value={email} onChange={(e) => this.handleChange('email', e.target.value)}/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => this.handleChange('password', e.target.value)}/>

          {extraFields}

          <button type="submit">Login</button>

          <a style={{cursor:'pointer'}} onClick={(e) => this.forgetPassword(e) }>Mot de passe oublié ?</a>
        </form>
      </div>
    );
  }
}

function select({ auth }) {
  return { auth };
}

export default connect(select)(Login);
