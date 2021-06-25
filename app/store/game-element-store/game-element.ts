import { model, Model, tProp, types, ExtendedModel, prop } from "mobx-keystone";

@model("pipeland/GameElement")
export class GameElement extends Model({
  id: prop<string>(),
  name: prop<string>(),
  description: prop<string>(),
  value: prop<number>(),
  imageUrl: prop<string>(),
  type: prop<string>(),
}) {}
