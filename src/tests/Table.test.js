import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import initialState from './helpers/mockInitialState';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Table from '../components/Table';

describe('Testes realizados no componente Table', () => {
  test('Testa o cabeçalho da tabela é renderizado corretamente', () => {
    renderWithRouterAndRedux(<Table />);
    expect(screen.getByRole('columnheader', {
      name: /descrição/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /tag/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /método de pagamento/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: 'Valor',
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: 'Moeda',
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /câmbio utilizado/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /valor convertido/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /moeda de conversão/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {
      name: /editar\/excluir/i,
    })).toBeInTheDocument();
  });

  test('Testa se o corpo da tabela é renderizado corretamente', () => {
    renderWithRouterAndRedux(<Table />, { initialState });

    expect(screen.getByRole('cell', {
      name: /teste1/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('cell', {
      name: /alimentação/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('cell', {
      name: /dinheiro/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('cell', {
      name: /10\.00/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('cell', {
      name: /dólar americano\/real brasileiro/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('cell', {
      name: /4\.75/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('cell', {
      name: /47\.53/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('cell', {
      name: 'Real',
    })).toBeInTheDocument();
    expect(screen.getByTestId('edit-btn')).toBeInTheDocument();
    expect(screen.getByTestId('delete-btn')).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão de excluir a despesa é removida da tela', () => {
    renderWithRouterAndRedux(<Table />, { initialState });
    expect(screen.getByRole('cell', {
      name: /teste1/i,
    })).toBeInTheDocument();

    const buttonDelete = screen.getByTestId('delete-btn');
    userEvent.click(buttonDelete);

    expect(screen.queryByRole('cell', {
      name: /teste1/i,
    })).toBe(null);
  });

  test('Testa se ao clicar no botão de editar a despesa é editada', () => {
    const { store } = renderWithRouterAndRedux(<Table />, { initialState });
    const description = screen.getByRole('cell', { name: /teste1/i });
    expect(description).toBeInTheDocument();
    const buttonEdit = screen.getByTestId('edit-btn');
    userEvent.click(buttonEdit);
    const state = store.getState();
    expect(state.wallet.editor).toEqual(true);
  });
});
