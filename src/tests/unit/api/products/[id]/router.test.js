import fetch from "node-fetch";
import faker from "faker";

describe("GET /products/[id]", () => {
  test("Deve retornar status 404 e Not Found com IDs que não existem", async () => {
    const minNumber = 42;
    const maxNumber = 100;
    const searchTerm = faker.datatype.number({
      min: minNumber,
      max: maxNumber,
    });

    const response = await fetch(
      `http://localhost:3000/api/products/${searchTerm}`
    );
    expect(response.status).toBe(404);
    expect(response.statusText).toBe("Not Found");
  });
});

describe("GET /products/[id]", () => {
  test("Deve retornar status 200 e um produto cadastrado", async () => {
    const minNumber = 2;
    const maxNumber = 41;
    const searchTerm = faker.datatype.number({
      min: minNumber,
      max: maxNumber,
    });
    const response = await fetch(
      `http://localhost:3000/api/products/${searchTerm}`
    );
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty("_id");
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("name");
    expect(data).toHaveProperty("price");
    expect(data).toHaveProperty("manufacturer");
    expect(data).toHaveProperty("category");
    expect(data).toHaveProperty("img");
  });
});
