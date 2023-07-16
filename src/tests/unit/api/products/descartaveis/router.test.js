import fetch from "node-fetch";

describe("GET /products/academicos", () => {
  test("Deve retornar status 200 e um lista de produtos da categoria Descartáveis", async () => {
    const response = await fetch(
      'http://localhost:3000/api/products/descartaveis'
    );
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.length).toBeGreaterThan(0);

    expect(Array.isArray(data)).toBe(true);

    data.forEach((item) => {
        expect(item).toHaveProperty("_id");
        expect(item).toHaveProperty("id");
        expect(item).toHaveProperty("name");
        expect(item).toHaveProperty("price");
        expect(item).toHaveProperty("manufacturer");
        expect(item).toHaveProperty("category")
        expect(item).toHaveProperty("img");
        expect(item.category).toBe("descartaveis");
    });
  });
});
