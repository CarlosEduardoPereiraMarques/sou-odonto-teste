import fetch from 'node-fetch';

describe('GET /api/users/:cpf', () => {
  test('Deve retornar o usuário de teste com o CPF fornecido', async () => {
    const userCpf = '11111111111';

    const response = await fetch(`http://localhost:3000/api/users/${userCpf}`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(expect.any(Object));
    expect(data._id).toBe('64b4317160c5a3b9c690c964');
    expect(data.name).toBe('Usuário de Teste');
    expect(data.cpf).toBe(userCpf);
    expect(data.email).toBe('usuariodeteste@teste.com');
  });
})

describe('GET /users', () => {
  test('Deve retornar status 404 e mensagem Not Found', async () => {
    const faker = require('faker-br')

    const response = await fetch(`http://localhost:3000/api/users/${faker.br.cpf()}`);
    expect(response.statusText).toBe('Not Found');
    expect(response.status).toBe(404);
  });
});
