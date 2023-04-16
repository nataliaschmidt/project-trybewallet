import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Table.css';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { deleteExpenseAction, expenseForEditAction } from '../redux/actions';

class Table extends Component {
  deleteExpense = (id) => {
    const { expenses, dispatch } = this.props;
    const newArrayExpenses = expenses.filter((expenseFiltered) => (
      expenseFiltered.id !== id
    ));
    dispatch(deleteExpenseAction(newArrayExpenses));
  };

  editExpenses = (id) => {
    const { dispatch } = this.props;
    dispatch(expenseForEditAction(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="container-table">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map(({ currency, description,
              id, method, tag, value, exchangeRates }) => {
              const exchangeRatesValue = Object.values(exchangeRates);
              const ask = Number(
                exchangeRatesValue
                  .find((currencyInfo) => currencyInfo.code === currency).ask,
              );

              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>
                    {exchangeRatesValue
                      .find((currencyInfo) => currencyInfo.code === currency).name}
                  </td>
                  <td>{ask.toFixed(2)}</td>
                  <td>{(Number(value) * ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      className="btn-expense"
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.editExpenses(id) }
                    >
                      <BiEditAlt className="icon-edit" />

                    </button>
                    <button
                      className="btn-expense"
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteExpense(id) }
                    >
                      <RiDeleteBinLine className="icon-delete" />

                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
  }).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(Table);
