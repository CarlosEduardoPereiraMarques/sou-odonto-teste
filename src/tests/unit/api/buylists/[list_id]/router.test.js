import fetch from 'node-fetch';
import connectDB from '/@app/@utils/'
import buylist_datas from '@/models/Buylist';

describe('GET /api/buylists/:list_id', () => {
  test('Deve retornar os produtos da lista de compras com o ID fornecido', async () => {
    const listId = '64b4317160c5a3b9c690c964';

    const response = await fetch(`http://localhost:3000/api/buylists/${listId}`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(expect.any(Array));
  });

  test('Deve retornar status 500 quando ocorrer um erro no banco de dados', async () => {
    jest.spyOn(connectDB, 'connectDB').mockRejectedValueOnce(new Error('Erro no banco de dados'));

    const listId = '64b4317160c5a3b9c690c964';

    const response = await fetch(`http://localhost:3000/api/buylists/${listId}`);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual('Database Error');
  });
});

describe('PUT /api/buylists/:list_id', () => {
  test('Deve atualizar a lista de compras com o ID fornecido e retornar a lista atualizada', async () => {
    const listId = '64b4317160c5a3b9c690c964';
    const updatedListName = 'Nova Lista de Compras';
    const updatedListDescription = 'Nova Descrição';

    const requestBody = {
      list_name: updatedListName,
      list_description: updatedListDescription,
    };

    const response = await fetch(`http://localhost:3000/api/buylists/${listId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(expect.any(Object));
  });

  test('Deve retornar status 404 quando a lista de compras com o ID fornecido não for encontrada', async () => {
    jest.spyOn(buylist_datas, 'findById').mockResolvedValueOnce(null);

    const listId = '64b4317160c5a3b9c690c964';
    const updatedListName = 'Nova Lista de Compras';
    const updatedListDescription = 'Nova Descrição';

    const requestBody = {
      list_name: updatedListName,
      list_description: updatedListDescription,
    };

    const response = await fetch(`http://localhost:3000/api/buylists/${listId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual('Lista de compras não encontrada');
  });
});

describe('DELETE /api/buylists/:list_id', () => {
  test('Deve excluir a lista de compras com o ID fornecido e retornar mensagem de sucesso', async () => {
    const listId = '64b4317160c5a3b9c690c964';

    const response = await fetch(`http://localhost:3000/api/buylists/${listId}`, {
      method: 'DELETE',
    });

    const data = await response.text();

    expect(response.status).toBe(201);
    expect(data).toEqual('Lista de compras excluída com sucesso');
  });

  test('Deve retornar status 404 quando a lista de compras com o ID fornecido não for encontrada', async () => {
    jest.spyOn(buylist_datas, 'findByIdAndDelete').mockResolvedValueOnce(null);

    const listId = '64b4317160c5a3b9c690c964';

    const response = await fetch(`http://localhost:3000/api/buylists/${listId}`, {
      method: 'DELETE',
    });

    const data = await response.text();

    expect(response.status).toBe(404);
    expect(data).toEqual('Lista de compras não encontrada');
  });
});
