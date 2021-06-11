import { model, Model, tProp, types, ExtendedModel, prop } from "mobx-keystone";
import { TaskResume } from "./task";

enum EnumMarioAvatars {
  MARIO = "mario",
  SUPER_MARIO = "superMario",
  FIRE_MARIO = "fireMario",
  CAPE_MARIO = "capeMario",
}

@model("pipeland/Class")
export class Class extends Model({
  id: prop<string>(),
  name: prop<string>(),
  active: prop<boolean>(),
  create_date: prop<string>(),
  teacher_name: prop<string>(),
}) {}

@model("pipeland/StudentInfo")
export class StudentInfo extends Model({
  student_id: prop<string>(),
  user_id: prop<string>(),
  photo: prop<string | null>(null),
  student_name: prop<string>(),
  nickname: prop<string | null>(null),
  current_coinst_qty: prop<number>(),
  current_avatar: prop<EnumMarioAvatars>(),
  current_mushroom_ups_qty: prop<number>(),
}) {}

@model("pipeland/ClassDetail")
export class ClassDetail extends ExtendedModel(Class, {
  coins_max: prop<number>(),
  student_info: prop<StudentInfo | null>(null),
  tasks: prop<TaskResume[]>(() => []),
}) {}
