import mockData from './mockData';

const initialState = {
  user: { email: 'alguem@alguem.com' },
  wallet: {
    apiReturn: mockData,
    currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
    expenses: [
      {
        id: 0,
        value: '10',
        description: 'teste1',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: mockData,
      },
    ],
    editor: false,
    idToEdit: 0,
  },
  toggleTheme: {
    theme: 'light',
  },
};

export default initialState;
