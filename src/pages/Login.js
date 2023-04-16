/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUserInfosAction } from '../redux/actions';
import circle from '../assets/images/circle.png';
import logoDark from '../assets/images/logo-dark.png';
import expenseFigure from '../assets/images/expenses.png';
import '../style/Login.css';

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
      <div className="container-login-page">
        <div className="container-imgs">
          <img
            className="circle"
            src={ circle }
            alt="círculo verde contendo o desenho de despesas"
          />
          <img
            className="expense-figure"
            src={ expenseFigure }
            alt="figura contendo diversos exemplos de despesas"
          />
        </div>

        <form
          onSubmit={ this.handleSubmit }
          className="form-login"
        >
          <img
            className="logo-trybe-wallet-login"
            src={ logoDark }
            alt="logo trybe wallet"
          />

          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="email"
                data-testid="email-input"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </p>
          </div>

          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                data-testid="password-input"
                name="password"
                value={ password }
                onChange={ this.handleChange }
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>

          <button
            className="button is-info is-rounded"
            disabled={ isButtonDisabled }
          >
            Entrar

          </button>
        </form>
      </div>
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
