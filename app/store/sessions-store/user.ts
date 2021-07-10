import { model, Model, prop } from "mobx-keystone";

export enum USER_ROLES {
  TEACHER = "PROFESSOR",
  STUDENT = "ALUNO",
}

@model("pipeland/User")
export class User extends Model({
  id: prop<string>(),
  name: prop<string>(),
  nickname: prop<string | undefined>(undefined),
  photo_url: prop<string | undefined>(undefined),
  email: prop<string>(),
  role: prop<keyof typeof USER_ROLES>(),
}) {}
