import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUserInfosAction } from '../redux/actions';

const MIN_LENGTH_PASSWORD = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  };

  validateForm = () => {
    const { email, password } = this.state;
    const regExpEmail = /[\w_.-]+@\w+(\.\w{2,3}){1,2}/g;
    const checkEmail = regExpEmail.test(email);
    const checkPassword = password.length >= MIN_LENGTH_PASSWORD;
    if (checkPassword && checkEmail) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addUserInfosAction(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <form
        onSubmit={ this.handleSubmit }
      >
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            id="email"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            id="password"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ isButtonDisabled }
        >
          Entrar

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
