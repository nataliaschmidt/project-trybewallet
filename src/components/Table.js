import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
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
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
  }).isRequired).isRequired,
};
export default connect(mapStateToProps)(Table);
