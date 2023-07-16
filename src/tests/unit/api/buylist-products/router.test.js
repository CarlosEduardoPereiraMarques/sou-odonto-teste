import fetch from 'node-fetch';
import { jest } from '@jest/globals';

import buylist_products from '@models/BuylistProducts';

describe('API /api/buylist-products', () => {
  test('GET /api/buylist-products - Deve retornar os produtos da lista de compras', async () => {
    // Simula a resposta com produtos da lista de compras
    jest.spyOn(buylist_products, 'find').mockResolvedValueOnce([{ name: 'Produto 1' }, { name: 'Produto 2' }]);

    const response = await fetch('http://localhost:3000/api/buylist-products');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(expect.any(Array));
    // Faça mais asserções conforme necessário para verificar os dados retornados
  });

  test('POST /api/buylist-products - Deve criar um novo produto da lista de compras', async () => {
    const user_id = '64b4317160c5a3b9c690c964';
    const buylist_id = '64b4317160c5a3b9c690c964';
    const product_id = '64b4317160c5a3b9c690c964';
    const amount = 2;
    const obligatory_item = true;

    // Simula a função new_buylist_products.save()
    jest.spyOn(buylist_products.prototype, 'save').mockImplementationOnce(() => {
      return Promise.resolve();
    });

    const response = await fetch('http://localhost:3000/api/buylist-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        buylist_id: buylist_id,
        product_id: product_id,
        amount: amount,
        obligatory_item: obligatory_item,
      }),
    });

    expect(response.status).toBe(201);
    expect(response.statusText).toBe('Created');
    // Faça mais asserções conforme necessário para verificar o comportamento esperado ao criar um novo produto da lista de compras
  });

  test('PUT /api/buylist-products - Deve atualizar um produto da lista de compras', async () => {
    const list_id = '64b4317160c5a3b9c690c964';
    const amount = 3;
    const obligatory_item = false;

    // Simula a função buylist_products.findByIdAndUpdate()
    jest.spyOn(buylist_products, 'findByIdAndUpdate').mockResolvedValueOnce({});

    const response = await fetch('http://localhost:3000/api/buylist-products', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        list_id: list_id,
        amount: amount,
        obligatory_item: obligatory_item,
      }),
    });

    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    // Faça mais asserções conforme necessário para verificar o comportamento esperado ao atualizar um produto da lista de compras
  });

  test('DELETE /api/buylist-products - Deve excluir um produto da lista de compras', async () => {
    const listId = '64b4317160c5a3b9c690c964';

    // Simula a função buylist_products.findByIdAndDelete()
    jest.spyOn(buylist_products, 'findByIdAndDelete').mockResolvedValueOnce({});

    const response = await fetch('http://localhost:3000/api/buylist-products', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listId: listId,
      }),
    });

    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    // Faça mais asserções conforme necessário para verificar o comportamento esperado ao excluir um produto da lista de compras
  });
});
