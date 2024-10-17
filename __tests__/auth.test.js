// __tests__/auth.test.js

const request = require("supertest"); // Supertest for HTTP request testing
const app = require("../my-backend/server"); // Your Express app
const User = require("../my-backend/UserModel"); // Assuming User is your User model
const bcrypt = require("bcrypt");

// Mock the User model and bcrypt
jest.mock("../my-backend/UserModel");
jest.mock("bcrypt");

describe("POST /sign-up", () => {
  // Test case 1: When the user already exists
  test("should return an error if the user already exists", async () => {
    // Mock the findOne method to return an existing user
    User.findOne.mockResolvedValue({ email: "existinguser@example.com" });

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

  // Test case 2: Successful user creation
  test("should create a new user if email does not exist", async () => {
    // Mock the findOne method to return null (user does not exist)
    User.findOne.mockResolvedValue(null);

    // Mock bcrypt.hash to return a dummy hashed password
    bcrypt.hash.mockResolvedValue("hashedpassword123");

    // Mock User.create to resolve (simulate successful user creation)
    User.create.mockResolvedValue({});

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

    // Ensure bcrypt was called correctly
    expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);

    // Ensure User.create was called with correct data
    expect(User.create).toHaveBeenCalledWith({
      username: "newuser",
      email: "newuser@example.com",
      password: "hashedpassword123",
      accounts: [],
    });
  });

  // Test case 3: Handle error during user creation
  test("should return an error if user creation fails", async () => {
    // Mock the findOne method to return null (user does not exist)
    User.findOne.mockResolvedValue(null);

    // Mock bcrypt.hash to return a dummy hashed password
    bcrypt.hash.mockResolvedValue("hashedpassword123");

    // Mock User.create to throw an error
    User.create.mockRejectedValue(new Error("Database error"));

    const response = await request(app).post("/sign-up").send({
      username: "newuser",
      email: "newuser@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: "error",
      data: expect.anything(),
    });
  });
});
