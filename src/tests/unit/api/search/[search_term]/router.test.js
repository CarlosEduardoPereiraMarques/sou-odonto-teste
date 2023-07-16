import fetch from 'node-fetch';
import faker from 'faker';

describe('GET /search/[search_term]', () => {
  test('Deve retornar status 500 pois não conseguiu encontrar nenhum produto com o Termo aleatório', async () => {
    const searchTerm = faker.random.word()
    const response = await fetch(`http://localhost:3000/api/search/${searchTerm}`);
    expect(response.statusText).toBe('Not Found')
    expect(response.status).toBe(404);
  });
});


describe('GET /search/[search_term]', () => {
    test('Deve retornar status 200 e todos os elementos devem ter "Kit" no nome', async () => {
      const searchTerm = 'kit';
  
      const response = await fetch(`http://localhost:3000/api/search/${searchTerm}`);
      expect(response.status).toBe(200);
  
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
  
      data.forEach((item) => {
        expect(item.name.toLowerCase()).toContain('kit');
      });
    });
  });
