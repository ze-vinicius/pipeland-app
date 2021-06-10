import { model, Model, tProp, types, ExtendedModel, prop } from "mobx-keystone";

@model("pipeland/TaskElement")
export class TaskElement extends Model({
  id: prop<string>(),
  name: prop<string>(),
  imageUrl: prop<string>(),
  quantity: prop<number>(),
}) {}

@model("pipeland/TaskResume")
export class TaskResume extends Model({
  id: prop<string>(),
  title: prop<string>(),
  delivery_date: prop<string>(),
  task_value: prop<number>(),
  task_elements: prop<TaskElement[]>(() => []),
}) {}

@model("pipeland/TaskDetail")
export class TaskDetail extends ExtendedModel(TaskResume, {
  description: prop<string>(),
  create_date: prop<string>(),
}) {}
