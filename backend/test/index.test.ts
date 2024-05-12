import request from "supertest";
import app from "../src/app";

describe("GET /api/wallets", () => {
  it("should respond with wallet address list", async () => {
    const response = await request(app).get("/api/wallets");
    expect(response.body.data).toHaveLength(1);
  });
});

// add more test cases...
