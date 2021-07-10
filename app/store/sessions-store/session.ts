import {
  model,
  Model,
  modelAction,
  modelFlow,
  prop,
  _async,
  _await,
} from "mobx-keystone";
import { api } from "../../services/api/api";
import utils from "../../utils";
import { User } from "./user";

@model("pipeland/Session")
export class Session extends Model({
  token: prop<string | null>(() => null),
  user: prop<User | null>(() => null),
}) {
  @modelFlow
  updateUserPhoto = _async(function* (
    this: Session,
    {
      uri,
    }: {
      uri: string;
    }
  ) {
    // this.isLoading.login = true;
    // this.errorMessage = null;

    try {
      yield* _await(
        api.updateUserPhoto({
          uri,
        })
      );
    } catch (error: any) {
      const err = utils.handleResponseError(error);

      console.log(err);

      // this.setErrorMessage(err.message);

      // setTimeout(() => {
      //   this.setErrorMessage("");
      // }, 3000);
    } finally {
      // this.isLoading.login = false;
    }
  });
}
