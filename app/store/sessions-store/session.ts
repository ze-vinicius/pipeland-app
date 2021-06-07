import { computed } from "mobx";
import { model, Model, modelAction, tProp, types } from "mobx-keystone";
import api from "../../services/api/api";

@model("pipeland/User")
export class User extends Model({
  id: tProp(types.string),
  name: tProp(types.string),
  email: tProp(types.string),
  role: tProp(types.string),
}) {}

@model("pipeland/Session")
export class Session extends Model({
  token: tProp(types.maybeNull(types.string)),
  user: tProp(types.maybeNull(types.model(User))),
}) {
  // @modelAction
  // setDone(done: boolean) {
  //   this.done = done;
  // }
  // @modelAction
  // setText(text: string) {
  //   this.text = text;
  // }
}
