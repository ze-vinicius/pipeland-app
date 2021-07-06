import { model, Model, modelAction, prop } from "mobx-keystone";

@model("pipeland/User")
export class User extends Model({
  id: prop<string>(),
  name: prop<string>(),
  nickname: prop<string | null>(null),
  photo: prop<string | null>(null),
  email: prop<string>(),
  role: prop<string>(),
}) {}

@model("pipeland/Session")
export class Session extends Model({
  token: prop<string | null>(() => null),
  user: prop<User | null>(() => null),
}) {}
