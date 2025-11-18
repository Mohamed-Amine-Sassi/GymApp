import { jest } from "@jest/globals";
import jwt from "jsonwebtoken";
import authMiddleware from "./authMiddleware.mjs";

describe("authMiddleware", () => {
  // Test 1: No token
  test("should return 401 if no authorization header", () => {
    const req = { headers: {} };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn(),
      }),
    };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  // Test 2: Malformed token
  test("should return 500 if no token in header", () => {
    const req = { headers: { authorization: "Bearer" } };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn(),
      }),
    };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  // Test 3: Valid token
  test("should call next() and set req.username if token is valid", (done) => {
    // Mock jwt.verify to simulate successful verification
    jest.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
      callback(null, { username: "testuser" });
    });

    const req = {
      headers: { authorization: `Bearer fake-token` },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn(),
      }),
    };
    const next = jest.fn(() => {
      expect(req.username).toBe("testuser");
      expect(next).toHaveBeenCalled();
      jwt.verify.mockRestore(); // Clean up the mock
      done();
    });

    authMiddleware(req, res, next);
  });

  // Test 4: Invalid token
  test("should return 403 if token is invalid", (done) => {
    // Mock jwt.verify to simulate verification failure
    jest.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"));
    });

    const req = {
      headers: { authorization: `Bearer invalid-token` },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn(),
      }),
    };
    const next = jest.fn();

    authMiddleware(req, res, next);

    // Give jwt.verify callback time to execute
    setTimeout(() => {
      expect(res.status).toHaveBeenCalledWith(403);
      jwt.verify.mockRestore();
      done();
    }, 50);
  });
});
