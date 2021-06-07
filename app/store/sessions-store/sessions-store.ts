import { computed } from "mobx";
import {
  model,
  Model,
  modelAction,
  tProp,
  prop,
  types,
  modelFlow,
  _async,
  _await,
} from "mobx-keystone";
import api from "../../services/api/api";
import { Session, User } from "./session";

@model("pipeland/SessionsStore")
export class SessionsStore extends Model({
  activeSession: tProp(types.maybe(types.model(Session))),
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
      const response = yield* _await(
        api.post("sessions", {
          email: "vinicius@gmail.com",
          password: "1234",
        })
      );

      const { token, user } = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      this.activeSession = new Session({
        user: new User({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }),
        token,
      });
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("error: " + error.response.data.error);
      } else {
        console.log("error: " + error.message);
      }
    }
  });
}
