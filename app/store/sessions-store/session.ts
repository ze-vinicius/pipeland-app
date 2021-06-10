import { model, Model, modelAction, prop } from "mobx-keystone";

@model("pipeland/User")
export class User extends Model({
  id: prop<string>(),
  name: prop<string>(),
  email: prop<string>(),
  role: prop<string>(),
}) {}

@model("pipeland/Session")
export class Session extends Model({
  token: prop<string | null>(() => null),
  user: prop<User | null>(() => null),
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
