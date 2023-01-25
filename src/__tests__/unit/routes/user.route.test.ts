import test from "tape";
import request from "supertest";
import httpStatusCode from "http-status-codes";

import app from "../../../app";

describe("Adding a request", () => {
  test("Should return 201 and successfully register user if request data is ok", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({
        name: "joao ninguem",
        username: "joao.ninguem",
        email: "joao.ninguem@sharklasers.com",
        confirm: {
          password: "123456asdf",
          passwordConfirmation: "123456asdf",
        },
        photo: "",
        token: "",
      })
      .expect(httpStatusCode.CREATED);

      console.log(111111111111111)
      console.log(222222222222222,res.body.user)

    expect(res.body.user).not.toHaveProperty("password");
  });
});
