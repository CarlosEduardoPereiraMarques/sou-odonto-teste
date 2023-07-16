import fetch from "node-fetch";
import buylist_datas from "@models/Buylist";

describe("GET /api/buylists", () => {
  test("Deve retornar as buylists com o ID de teste fornecido", async () => {
    const buylistId = "64b431d160c5a3b9c690c96a";

    const response = await fetch(
      `http://localhost:3000/api/buylists/${buylistId}`
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

  test("Deve criar uma nova buylist com os dados fornecidos", async () => {
    const user_email = "usuariodeteste@teste.com";
    const name = "Nova Buylist Post";
    const description = "Descrição da Nova Buylist";
    jest.spyOn(buylist_datas.prototype, "save").mockImplementationOnce(() => {
      return Promise.resolve();
    });

    const response = await fetch("http://localhost:3000/api/buylists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email: user_email,
        name: name,
        description: description,
      }),
    });
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toEqual("BuylistDatas has been created");
  });
});
