import fetch from 'node-fetch';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import {jest} from '@jest/globals';

describe('POST /api/auth/register', () => {
  test('Deve criar um novo usuário com os dados fornecidos', async () => {
    const name = 'Usuário de Teste';
    const cpf = '11111111111';
    const email = 'usuariodeteste@teste.com';
    const password = 'password';

    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed_password');
    jest.spyOn(User.prototype, 'save').mockResolvedValue();

    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        cpf: cpf,
        email: email,
        password: password,
      }),
    });

    expect(response.status).toBe(201);
    const data = await response.text();
    expect(data).toBe('User has been created');

    jest.spyOn(bcrypt, 'hash').mockRestore();
    jest.spyOn(User.prototype, 'save').mockRestore();
  });

  test('Deve retornar erro 500 em caso de erro no banco de dados', async () => {
    const name = 'Usuário de Teste';
    const cpf = '11111111111';
    const email = 'usuariodeteste@teste.com';
    const password = 'password';

    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed_password');
    jest.spyOn(User.prototype, 'save').mockRejectedValue(new Error('Database Error'));

    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        cpf: cpf,
        email: email,
        password: password,
      }),
    });

    expect(response.status).toBe(500);
    const data = await response.text();
    expect(data).toBe('Database Error');

    jest.spyOn(bcrypt, 'hash').mockRestore();
    jest.spyOn(User.prototype, 'save').mockRestore();
  });
});
