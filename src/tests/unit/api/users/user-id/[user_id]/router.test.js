import fetch from 'node-fetch';
import { UUID } from 'crypto';

describe('GET /users', () => {
  test('Deve retornar status 500 pois não conseguiu encontrar o usuário com ID fake', async () => {
    const response = await fetch(`http://localhost:3000/api/users/user-id/${UUID}`);
    expect(response.status).toBe(500);
  });
});

describe('GET /api/users/:user_id', () => {
  test('Deve retornar status 200 pois conseguiu encontrar o usuário de teste', async () => {
    const userId = '64b4317160c5a3b9c690c964';

    const response = await fetch(`http://localhost:3000/api/users/user-id/${userId}`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(expect.any(Object));
    expect(data._id).toBe(userId);
    expect(data.name).toBe('Usuário de Teste');
    expect(data.cpf).toBe('11111111111');
    expect(data.email).toBe('usuariodeteste@teste.com');
  });
})