import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resolveFetchCurrency,
  addExpenses,
  uppdateExpanseAction } from '../redux/actions';

const CATEGORIES = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: CATEGORIES[0],
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

  handleSubmit = (e) => {
    e.preventDefault();

    const { apiReturn } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: apiReturn,
    };
    const { dispatch } = this.props;
    dispatch(addExpenses(expense));
    this.setState((current) => ({
      id: current.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: CATEGORIES[0],
    }));
    dispatch(resolveFetchCurrency());
  };

  handleClickEditExpense = (e) => {
    e.preventDefault();
    const { idToEdit, expenses, dispatch } = this.props;
    let findExpense = expenses.find((expense) => expense.id === idToEdit);

    const { value,
      description,
      currency,
      method,
      tag } = this.state;

    findExpense = { ...findExpense, value, description, currency, method, tag };

    const editExpenses = expenses.map((expense) => {
      if (expense.id === idToEdit) {
        return findExpense;
      }
      return expense;
    });
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: CATEGORIES[0],
    }, () => dispatch(uppdateExpanseAction(editExpenses)));
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            id="value"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            id="description"
            type="text"
            name="description"
            value={ description }
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

        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            {
              CATEGORIES.map((categoryMap) => (
                <option key={ categoryMap }>{categoryMap}</option>
              ))
            }
          </select>
        </label>
        {
          !editor
            ? <button onClick={ this.handleSubmit }>Adicionar despesa</button>
            : <button onClick={ this.handleClickEditExpense }>Editar despesa</button>
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  apiReturn: state.wallet.apiReturn,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  apiReturn: PropTypes.shape({}).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
  }).isRequired).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
