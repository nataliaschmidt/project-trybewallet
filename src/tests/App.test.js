import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes realizados na página de Login', () => {
  const email = 'alguem@alguem.com';
  const password = '123456';

  test('testa se os elementos de input e botão estão presentes na tela', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('testa se ao digitar um email correto e uma senha menor que 6 dígitos o botão permanece desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '12345');
    expect(button).toBeDisabled();
  });

  test('testa se ao digitar uma senha com 6 dígitos e um email no formato incorreto, o botão permanece desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, 'alguem.com');
    userEvent.type(passwordInput, password);
    expect(button).toBeDisabled();
  });

  test('testa se ao digitar nos inputs eles recebem os valores digitados e o botão de Login é habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    expect(emailInput.value).toBe(email);
    expect(passwordInput.value).toBe(password);
    expect(button).toBeEnabled();
  });

  test('testa se ao clicar no botão a página é direcionada para a carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    expect(emailInput.value).toBe(email);
    expect(passwordInput.value).toBe(password);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
});
