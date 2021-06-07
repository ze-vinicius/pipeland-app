import { model, Model, tProp, types, ExtendedModel } from "mobx-keystone";

@model("pipeland/TaskElement")
export class TaskElement extends Model({
  id: tProp(types.string),
  name: tProp(types.string),
  imageUrl: tProp(types.string),
  quantity: tProp(types.number),
}) {}

@model("pipeland/Task")
export class Task extends Model({
  id: tProp(types.string),
  title: tProp(types.string),
  description: tProp(types.string),
  delivery_date: tProp(types.dateString),
  create_date: tProp(types.dateString),
  task_value: tProp(types.number),
  task_elements: tProp(types.array(types.model(TaskElement)), () => []),
}) {}
