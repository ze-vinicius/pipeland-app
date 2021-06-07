import { computed } from "mobx";
import { model, Model, tProp, types, ExtendedModel } from "mobx-keystone";
import { Task } from "./task";

enum EnumMarioAvatars {
  MARIO = "mario",
  SUPER_MARIO = "superMario",
  FIRE_MARIO = "fireMario",
  CAPE_MARIO = "capeMario",
}

@model("pipeland/Class")
export class Class extends Model({
  id: tProp(types.string),
  name: tProp(types.string),
  active: tProp(types.boolean),
  create_date: tProp(types.dateString),
  teacher_name: tProp(types.string),
}) {}

@model("pipeland/StudentInfo")
export class StudentInfo extends Model({
  student_id: tProp(types.string),
  user_id: tProp(types.string),
  photo: tProp(types.maybeNull(types.string), () => null),
  student_name: tProp(types.string),
  nickname: tProp(types.maybeNull(types.string), () => null),
  current_coinst_qty: tProp(types.number, () => 0),
  current_avatar: tProp(types.enum(EnumMarioAvatars)),
  current_mushroom_ups_qty: tProp(types.number, () => 0),
}) {}

@model("pipeland/ClassDetail")
export class ClassDetail extends ExtendedModel(Class, {
  coins_max: tProp(types.number, () => 0),
  student_info: tProp(types.maybeNull(types.model(StudentInfo)), () => null),
  tasks: tProp(types.array(types.model(Task)), () => []),
}) {}
