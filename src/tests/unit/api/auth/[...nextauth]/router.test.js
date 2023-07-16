import fetch from 'node-fetch';
import User from '@/models/User';
import connectDB from '@/utils/db';
import bcrypt from 'bcrypt';

describe('GET /api/buylist-products/:listID', () => {
  beforeAll(async () => {
    await connectDB();
  });

  test('Deve retornar os produtos da buylist com o ID de teste fornecido', async () => {
    const listID = '64b4317160c5a3b9c690c964';

    // Simulação do banco de dados
    jest.spyOn(User, 'findOne').mockResolvedValueOnce({
      _id: '64b4317160c5a3b9c690c964',
      name: 'Usuário de Teste',
      cpf: '11111111111',
      email: 'usuariodeteste@teste.com',
      password: await bcrypt.hash('password', 5),
    });

    const response = await fetch(`http://localhost:3000/api/buylist-products/${listID}`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(expect.any(Array));
    data.forEach((item) => {
      expect(item).toHaveProperty('_id');
      expect(item).toHaveProperty('list_id', listID);
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('quantity');
      expect(item).toHaveProperty('price');
    });

    jest.spyOn(User, 'findOne').mockRestore();
  });

  test('Deve retornar erro 500 em caso de erro no banco de dados', async () => {
    const listID = 'invalidID';

    // Simulação do banco de dados
    jest.spyOn(User, 'findOne').mockRejectedValueOnce(new Error('Database Error'));

    const response = await fetch(`http://localhost:3000/api/buylist-products/${listID}`);

    expect(response.status).toBe(500);
    const data = await response.text();
    expect(data).toBe('Database Error');

    jest.spyOn(User, 'findOne').mockRestore();
  });

  test('Deve retornar erro 404 se a lista de compras não for encontrada', async () => {
    const listID = 'nonExistingListID';

    // Simulação do banco de dados
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

    const response = await fetch(`http://localhost:3000/api/buylist-products/${listID}`);

    expect(response.status).toBe(404);
    const data = await response.text();
    expect(data).toBe('Lista de compras não encontrada');

    jest.spyOn(User, 'findOne').mockRestore();
  });
});
