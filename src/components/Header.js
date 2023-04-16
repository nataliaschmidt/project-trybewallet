import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Header.css';
import { BsCashCoin } from 'react-icons/bs';
import { HiOutlineUserCircle } from 'react-icons/hi';
import logoDark from '../assets/images/logo-dark.png';
import logoLight from '../assets/images/logo-light.png';

class Header extends Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    const sumExpenses = expenses.reduce(
      (acc, index) => Number(acc)
      + (Number(index.value) * index.exchangeRates[index.currency].ask),
      0,
    );
    return sumExpenses.toFixed(2);
  };

  render() {
    const { email, theme } = this.props;
    return (
      <header>
        <p data-testid="total-field">
          <BsCashCoin className="icon-green" />
          {' '}
          {`Total de despesas: ${this.sumExpenses()} BRL`}
        </p>
        <img
          className="logo-trybe-wallet-header"
          src={ theme === 'light' ? logoDark : logoLight }
          alt={ theme === 'light' ? 'logo trybe wallet light'
            : 'logo trybe wallet dark' }
        />
        <p data-testid="email-field">
          <HiOutlineUserCircle className="icon-green" />
          {email}
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  theme: state.toggleTheme.theme,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
  }).isRequired).isRequired,
  theme: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
