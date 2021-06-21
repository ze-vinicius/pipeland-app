import { model, Model, tProp, types, ExtendedModel, prop } from "mobx-keystone";

@model("pipeland/TaskCorrectionElement")
export class TaskCorrectionElement extends Model({
  id: prop<string>(),
  name: prop<string>(),
  imageUrl: prop<string>(),
  type: prop<string>(),
}) {}

@model("pipeland/TaskElement")
export class TaskElement extends Model({
  id: prop<string>(),
  name: prop<string>(),
  imageUrl: prop<string>(),
  quantity: prop<number>(),
}) {}

@model("pipeland/TaskCorrection")
export class TaskCorrection extends Model({
  id: prop<string>(),
  earned_coins: prop<number>(),
  comment: prop<string>(),
  task_id: prop<string>(),
  student_id: prop<string>(),
  create_date: prop<string>(),
  applied_penalties: prop<TaskCorrectionElement[]>(() => []),
  applied_bonuses: prop<TaskCorrectionElement[]>(() => []),
}) {}

@model("pipeland/TaskResume")
export class TaskResume extends Model({
  id: prop<string>(),
  title: prop<string>(),
  delivery_date: prop<string>(),
  status: prop<string>(),
  task_value: prop<number>(),
  task_elements: prop<TaskElement[]>(() => []),
}) {}

@model("pipeland/TaskDetail")
export class TaskDetail extends ExtendedModel(TaskResume, {
  description: prop<string>(),
  create_date: prop<string>(),
  task_correction: prop<TaskCorrection | null>(null),
}) {}
