import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import initialState from './helpers/mockInitialState';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

describe('Testa o componente Wallet', () => {
  test('Testa a função de trocar o tema', () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState });
    const state = store.getState();
    const btnTheme = screen.getByTestId('theme-button');
    const imgLogoLight = screen.getByRole('img', {
      name: /logo trybe wallet light/i,
    });
    expect(imgLogoLight).toBeInTheDocument();
    expect(state.toggleTheme.theme).toBe('light');
    act(() => {
      userEvent.click(btnTheme);
    });

    const imgLogoDark = screen.getByRole('img', {
      name: /logo trybe wallet dark/i,
    });
    const state2 = store.getState();
    expect(state2.toggleTheme.theme).toBe('dark');
    expect(imgLogoDark).toBeInTheDocument();

    act(() => {
      userEvent.click(btnTheme);
    });
    expect(imgLogoLight).toBeInTheDocument();
  });

  test('Testa se ao adicionar uma despesa e editar ela retorna corretamente', () => {
    const initialStatEmptyExpenses = {
      user: { email: 'alguem@alguem.com' },
      wallet: {
        apiReturn: mockData,
        currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
      toggleTheme: {
        theme: 'light',
      },
    };
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: initialStatEmptyExpenses },
    );
    const inputValue = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });
    const inputDescription = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const btnAddExpense = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(inputValue, '5');
    userEvent.type(inputDescription, 'refrigerante');

    act(() => {
      userEvent.click(btnAddExpense);
    });

    userEvent.type(inputValue, '2');
    userEvent.type(inputDescription, 'chocolate');

    act(() => {
      userEvent.click(btnAddExpense);
    });
    const totalFild = screen.getByText(/total de despesas: 33\.27 brl/i);
    expect(totalFild).toBeInTheDocument();

    const btnEditExpenseTable = screen.getAllByTestId('edit-btn');

    userEvent.click(btnEditExpenseTable[1]);
    userEvent.type(inputValue, '5');
    const btnEditExpense = screen.getByRole('button', {
      name: /editar despesa/i,
    });
    act(() => {
      userEvent.click(btnEditExpense);
    });
    const newTotalFild = screen.getByText(/total de despesas: 47\.53 brl/i);
    expect(newTotalFild).toBeInTheDocument();
    const state = store.getState();
    expect(state.wallet.expenses[1].value).toEqual('5');
  });
});
