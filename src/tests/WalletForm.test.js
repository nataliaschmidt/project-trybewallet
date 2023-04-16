import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import mockFetch from './helpers/mockFetch';
import mockData from './helpers/mockData';

const tag = 'Alimentação';
const email = 'alguem@alguem.com';
const initialState = {
  user: { email },
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
        tag,
        exchangeRates: mockData,
      },
    ],
    editor: false,
    idToEdit: 0,
  },
};

describe('Testes realizados no componente WalletForm', () => {
  test('Testa se o formulário é renderizado corretamente', () => {
    renderWithRouterAndRedux(<WalletForm />);
    expect(screen.getByRole('spinbutton', {
      name: /valor:/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('textbox', {
      name: /descrição:/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('combobox', {
      name: /moeda:/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('combobox', {
      name: /método de pagamento:/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('combobox', {
      name: /categoria:/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /adicionar despesa/i,
    })).toBeInTheDocument();
  });

  test('Testa se o formulário recebe os valores', () => {
    renderWithRouterAndRedux(<WalletForm />, { initialState });
    const inputValue = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });
    const inputDescription = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const inputCurrency = screen.queryByTestId('currency-input');

    const inputMethod = screen.queryByTestId('method-input');

    const inputTag = screen.queryByTestId('tag-input');

    const buttonAddExpense = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(inputValue, '10');
    expect(inputValue.value).toBe('10');

    userEvent.type(inputDescription, 'teste1');
    expect(inputDescription.value).toBe('teste1');

    userEvent.selectOptions(inputCurrency, 'CAD');
    expect(inputCurrency.value).toBe('CAD');

    userEvent.selectOptions(inputMethod, 'Dinheiro');
    expect(inputMethod.value).toBe('Dinheiro');

    userEvent.selectOptions(inputTag, 'Lazer');
    expect(inputTag.value).toBe('Lazer');
    act(() => {
      userEvent.click(buttonAddExpense);
    });
    expect(inputValue.value).toBe('');
    expect(inputDescription.value).toBe('');
    expect(inputCurrency.value).toBe('USD');
    expect(inputMethod.value).toBe('Dinheiro');
    expect(inputTag.value).toBe(tag);
  });

  test('Testa se o fetch é chamado corretamente', async () => {
    mockFetch();
    await act(async () => {
      renderWithRouterAndRedux(<WalletForm />, { initialState });
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('Testa o botão de editar despesas', async () => {
    mockFetch();
    const initialStateEditorTrue = {
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
            tag,
            exchangeRates: mockData,
          },
        ],
        editor: true,
        idToEdit: 0,
      },
    };
    await act(async () => {
      renderWithRouterAndRedux(<WalletForm />, { initialState: initialStateEditorTrue });
    });

    const btnEditExpense = screen.getByRole('button', {
      name: /editar despesa/i,
    });
    expect(btnEditExpense).toBeInTheDocument();
    act(() => {
      userEvent.click(btnEditExpense);
    });

    const inputValue = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });
    const inputDescription = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const inputCurrency = screen.queryByTestId('currency-input');

    const inputMethod = screen.queryByTestId('method-input');

    const inputTag = screen.queryByTestId('tag-input');

    expect(inputValue.value).toBe('');
    expect(inputDescription.value).toBe('');
    expect(inputCurrency.value).toBe('USD');
    expect(inputMethod.value).toBe('Dinheiro');
    expect(inputTag.value).toBe('Alimentação');
  });
});
