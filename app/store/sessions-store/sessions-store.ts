import {
  model,
  Model,
  prop,
  modelFlow,
  _async,
  _await,
  modelAction,
} from "mobx-keystone";
import { api } from "../../services/api/api";
import { load, save } from "../../utils/storage";
import { Session, User } from "./session";

@model("pipeland/SessionsStore")
export class SessionsStore extends Model({
  activeSession: prop<Session | null>(() => null),
  isLoading: prop<boolean>(false),
  errorMessage: prop<string | null>(() => null),
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
    this.isLoading = true;

    try {
      const session = yield* _await(
        api.login({
          email,
          password,
        })
      );

      this.activeSession = session;

      save("@pipeland:token", session.token);
      save("@pipeland:user", session.user);
    } catch (error: any) {
      let errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      this.errorMessage = errorMessage;
    } finally {
      this.isLoading = false;
    }
  });

  @modelFlow
  loadSessionInfo = _async(function* (this: SessionsStore) {
    this.isLoading = true;

    const token = yield* _await(load("@pipeland:token"));
    const user = yield* _await(load("@pipeland:user"));

    if (!!token && !!user) {
      this.activeSession = new Session({
        user: new User(user),
        token,
      });

      api.axios.defaults.headers.authorization = `Bearer ${token}`;
    }

    this.isLoading = false;
  });

  @modelAction
  clearErrors = () => {
    this.errorMessage = null;
  };
}
