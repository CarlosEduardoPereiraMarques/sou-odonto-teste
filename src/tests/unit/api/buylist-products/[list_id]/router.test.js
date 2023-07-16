import fetch from 'node-fetch';
import buylist_datas from "@/models/Buylist";
import { jest } from '@jest/globals';

describe('GET /api/buylist-products/:listID', () => {
  test('Deve retornar os produtos da buylist com o ID de teste fornecido', async () => {
    const listID = '64b4317160c5a3b9c690c964';

    jest.spyOn(buylist_products, 'find').mockResolvedValue([
      { _id: 'product1', list_id: listID, name: 'Product 1', quantity: 1, price: 10 },
      { _id: 'product2', list_id: listID, name: 'Product 2', quantity: 2, price: 20 },
    ]);

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

    jest.spyOn(buylist_products, 'find').mockRestore();
  });

  test('Deve retornar erro 500 em caso de erro no banco de dados', async () => {
    const listID = 'invalidID';

    jest.spyOn(buylist_products, 'find').mockRejectedValue(new Error('Database Error'));

    const response = await fetch(`http://localhost:3000/api/buylist-products/${listID}`);

    expect(response.status).toBe(500);
    const data = await response.text();
    expect(data).toBe('Database Error');

    jest.spyOn(buylist_products, 'find').mockRestore();
  });

  test('Deve retornar erro 404 se a lista de compras não for encontrada', async () => {
    const listID = 'nonExistingListID';

    jest.spyOn(buylist_products, 'find').mockResolvedValue([]);

    const response = await fetch(`http://localhost:3000/api/buylist-products/${listID}`);

    expect(response.status).toBe(404);
    const data = await response.text();
    expect(data).toBe('Lista de compras não encontrada');

    jest.spyOn(buylist_products, 'find').mockRestore();
  });
});

describe('PUT /api/buylist-products/:listID', () => {
  test('Deve atualizar os campos da buylist com o ID de teste fornecido', async () => {
    const listID = '64b4317160c5a3b9c690c964';
    const list_name = 'Nova Lista de Compras';
    const list_description = 'Descrição da Nova Lista de Compras';

    jest.spyOn(buylist_datas, 'findById').mockResolvedValue({
      _id: listID,
      name: 'Buylist',
      description: 'Descrição da Buylist',
    });

    jest.spyOn(buylist_datas, 'findByIdAndUpdate').mockResolvedValue({
      _id: listID,
      name: list_name,
      description: list_description,
    });

    const response = await fetch(`http://localhost:3000/api/buylist-products/${listID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        list_name: list_name,
        list_description: list_description,
      }),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('_id', listID);
    expect(data).toHaveProperty('name', list_name);
    expect(data).toHaveProperty('description', list_description);

    jest.spyOn(buylist_datas, 'findById').mockRestore();
    jest.spyOn(buylist_datas, 'findByIdAndUpdate').mockRestore();
  });

  test('Deve retornar erro 500 em caso de erro no banco de dados', async () => {
    const listID = 'invalidID';
    const list_name = 'Nova Lista de Compras';
    const list_description = 'Descrição da Nova Lista de Compras';

    jest.spyOn(buylist_datas, 'findById').mockRejectedValue(new Error('Database Error'));

    const response = await fetch(`http://localhost:3000/api/buylist-products/${listID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        list_name: list_name,
        list_description: list_description,
      }),
    });

    expect(response.status).toBe(500);
    const data = await response.text();
    expect(data).toBe('Database Error');

    jest.spyOn(buylist_datas, 'findById').mockRestore();
  });

  test('Deve retornar erro 404 se a lista de compras não for encontrada', async () => {
    const listID = 'nonExistingListID';
    const list_name = 'Nova Lista de Compras';
    const list_description = 'Descrição da Nova Lista de Compras';

    jest.spyOn(buylist_datas, 'findById').mockResolvedValue(null);

    const response = await fetch(`http://localhost:3000/api/buylist-products/${listID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        list_name: list_name,
        list_description: list_description,
      }),
    });

    expect(response.status).toBe(404);
    const data = await response.text();
    expect(data).toBe('Lista de compras não encontrada');

    jest.spyOn(buylist_datas, 'findById').mockRestore();
  });
});
