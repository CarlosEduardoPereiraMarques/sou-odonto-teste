import fetch from "node-fetch";

test("Deve retornar as buylists do usuário de teste", async () => {
  const userEmail = "usuariodeteste@teste.com";

  const response = await fetch(
    `http://localhost:3000/api/users/buylist/${userEmail}`
  );
  const data = await response.json();

  expect(response.status).toBe(200);
  expect(data).toEqual(expect.any(Array));
  data.forEach((item) => {
    expect(item).toHaveProperty("_id");
    expect(item).toHaveProperty("user_id");
    expect(item).toHaveProperty("name");
    expect(item).toHaveProperty("description");
  });
});

test("Deve retornar status 500 quando ocorrer um erro no banco de dados", async () => {
  const userEmail = "fake@teste.com";

  const response = await fetch(
    `http://localhost:3000/api/users/buylist/${userEmail}`
  );
  expect(response.status).toBe(500);
  expect(response.statusText).toEqual("Internal Server Error");
});
