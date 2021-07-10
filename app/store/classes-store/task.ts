import { computed } from "mobx";
import { model, Model, ExtendedModel, prop, modelAction } from "mobx-keystone";

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
  create_date: prop<string>(),
  status: prop<string>(),
  task_value: prop<number>(),
  task_elements: prop<TaskElement[]>(() => []),
}) {
  @modelAction
  findTaskElement = (elementName: string) => {
    return this.task_elements.find((element) => element.name === elementName);
  };
}

@model("pipeland/StudentTaskCorrection")
export class StudentTaskCorrection extends Model({
  id: prop<string>(),
  name: prop<string>(),
  photo: prop<string | null>(null),
  task_correction: prop<TaskCorrection | null>(null),
}) {}

@model("pipeland/Task")
export class Task extends ExtendedModel(TaskResume, {
  description: prop<string | null>(null),
  task_correction: prop<TaskCorrection | null>(null),
  studentsTasksCorrections: prop<StudentTaskCorrection[]>(
    () => []
  ).withSetter(),
}) {
  @modelAction
  getSelectedStudentTaskCorrection(id: string) {
    const findStudent = this.studentsTasksCorrections.find(
      (item) => item.id === id
    );

    return findStudent;
  }
}
