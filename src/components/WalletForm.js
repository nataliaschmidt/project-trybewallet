import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resolveFetchCurrency } from '../redux/actions';

const CATEGORIES = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
    valueExpense: 0,
    descriptionExpense: '',
    currency: '',
    method: '',
    category: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resolveFetchCurrency());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { valueExpense, descriptionExpense, currency, method, category } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valueExpense">
          Valor:
          <input
            data-testid="value-input"
            id="valueExpense"
            type="number"
            name="valueExpense"
            value={ valueExpense }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="descriptionExpense">
          Valor:
          <input
            data-testid="description-input"
            id="descriptionExpense"
            type="text"
            name="descriptionExpense"
            value={ descriptionExpense }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              currencies.map((currencyMap) => (
                <option key={ currencyMap }>{currencyMap}</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method">
          Método de Pagamento:
          <select
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="category">
          Categoria:
          <select
            data-testid="tag-input"
            id="category"
            name="category"
            value={ category }
            onChange={ this.handleChange }
          >
            {
              CATEGORIES.map((categoryMap) => (
                <option key={ categoryMap }>{categoryMap}</option>
              ))
            }
          </select>
        </label>

      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
