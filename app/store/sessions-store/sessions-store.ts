import {
  model,
  Model,
  prop,
  modelFlow,
  _async,
  _await,
  modelAction,
  getSnapshot,
} from "mobx-keystone";
import { api } from "../../services/api/api";
import utils from "../../utils";
import { load, remove, save } from "../../utils/storage";
import { Session, User } from "./session";

interface isLoading {
  login: boolean;
  signUp: boolean;
  loadSession: boolean;
}
@model("pipeland/SessionsStore")
export class SessionsStore extends Model({
  activeSession: prop<Session | null>(() => null),
  isLoading: prop<isLoading>(() => ({
    login: false,
    signUp: false,
    loadSession: false,
  })),
  errorMessage: prop<string | null>(() => null).withSetter(),
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
    this.isLoading.login = true;
    this.errorMessage = null;

    try {
      const session = yield* _await(
        api.login({
          email,
          password,
        })
      );

      this.activeSession = session;

      const token = getSnapshot(session.token);
      const user = getSnapshot(session.user);

      save("@pipeland:token", token);
      save("@pipeland:userId", user?.id);
    } catch (error: any) {
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    } finally {
      this.isLoading.login = false;
    }
  });

  @modelFlow
  signUp = _async(function* (
    this: SessionsStore,
    {
      name,
      email,
      password,
      role,
    }: {
      name: string;
      email: string;
      password: string;
      role: string;
    }
  ) {
    this.isLoading.signUp = true;
    this.errorMessage = null;

    try {
      yield* _await(
        api.signUp({
          email,
          password,
          name,
          role,
        })
      );

      yield* _await(
        this.login({
          email,
          password,
        })
      );
    } catch (error: any) {
      let errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      this.errorMessage = errorMessage;
    } finally {
      this.isLoading.signUp = false;
    }
  });

  @modelFlow
  logout = _async(function* (this: SessionsStore) {
    this.activeSession = null;

    yield* _await(
      Promise.all([remove("@pipeland:token"), remove("@pipeland:user")])
    );
  });

  @modelFlow
  loadSessionInfo = _async(function* (this: SessionsStore) {
    this.isLoading.loadSession = true;

    const token = yield* _await(load("@pipeland:token"));
    const userId = yield* _await(load("@pipeland:userId"));

    try {
      if (!!token && !!userId) {
        api.axios.defaults.headers.authorization = `Bearer ${token}`;

        const user = yield* _await(api.fetchSessionInfo());

        this.activeSession = new Session({
          user,
          token,
        });
      }
    } catch (error: any) {
      if (__DEV__) {
        console.log(error);
      }

      let errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      this.setErrorMessage(errorMessage);
    } finally {
      this.isLoading.loadSession = false;
    }
  });

  @modelAction
  clearErrors = () => {
    this.errorMessage = null;
  };
}
