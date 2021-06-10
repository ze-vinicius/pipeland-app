import { model, Model, prop, modelFlow, _async, _await } from "mobx-keystone";
import { api } from "../../services/api/api";
import { Session } from "./session";

@model("pipeland/SessionsStore")
export class SessionsStore extends Model({
  activeSession: prop<Session | null>(() => null),
}) {
  @modelFlow
  login = _async(function* (
    this: SessionsStore,
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    }
  ) {
    try {
      const session = yield* _await(
        api.login({
          email: "vinicius@gmail.com",
          password: "1234",
        })
      );

      this.activeSession = session;
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log("error: " + error.response.data.error);
      } else {
        console.log("error: " + error.message);
      }
    }
  });
}
