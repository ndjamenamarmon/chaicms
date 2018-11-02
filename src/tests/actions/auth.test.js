import { login, logout } from "../../actions/auth";

test("should set up login action object with data", () => {
  const uid = "sldfjlkasjlf920ujlks";
  const action = login(uid);
  expect(action).toEqual({
    type: "LOGIN",
    uid
  });
});

test("should set up logout action object with data", () => {
  const action = logout();
  expect(action).toEqual({
    type: "LOGOUT"
  });
});
