import React from 'react';
import { screen } from '@testing-library/react';
import initialState from './helpers/mockInitialState';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Header from '../components/Header';

describe('Testes realizados no componente Header', () => {
  test('Testa se os elementos do Header aparecem na tela tela', () => {
    renderWithRouterAndRedux(<Header />);
    expect(screen.getByTestId('email-field')).toBeInTheDocument();
    expect(screen.getByText(/brl/i)).toBeInTheDocument();
    expect(screen.getByTestId('total-field')).toBeInTheDocument();
  });

  test('Testa se o email salvo no estado global é renderizado no Header', () => {
    renderWithRouterAndRedux(<Header />, { initialState });

    expect(screen.getByText(/alguem@alguem\.com/i)).toBeInTheDocument();
  });

  test(
    'Testa se ao ter uma despesa salva o total dedespesas tem valor adequeado calculado',
    () => {
      renderWithRouterAndRedux(<Header />, { initialState });
      expect(screen.getByText(/47.53/i)).toBeInTheDocument();
    },
  );
});
