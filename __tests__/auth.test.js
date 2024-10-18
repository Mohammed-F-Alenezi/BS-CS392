jest.setTimeout(10000); // Set timeout to 10 seconds (10000 ms)

const mockingoose = require("mockingoose");
const request = require("supertest");
const app = require("../my-backend/server");
const User = require("../my-backend/UserModel");
const bcrypt = require("bcrypt");

jest.mock("bcrypt");

describe("POST /sign-up", () => {
  beforeEach(() => {
    mockingoose.resetAll(); // Reset the mocks before each test
  });

  test("should return error if user already exists", async () => {
    mockingoose(User).toReturn(
      { email: "existinguser@example.com" },
      "findOne"
    );

    const response = await request(app).post("/sign-up").send({
      username: "existinguser",
      email: "existinguser@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: "error",
      message: "User already exists",
    });
  });

  test("should create a new user if email does not exist", async () => {
    mockingoose(User).toReturn(null, "findOne");
    bcrypt.hash.mockResolvedValue("hashedpassword123");
    mockingoose(User).toReturn({}, "save");

    const response = await request(app).post("/sign-up").send({
      username: "newuser",
      email: "newuser@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      message: "User created",
    });
  });
});
