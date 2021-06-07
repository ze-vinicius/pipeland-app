import { computed } from "mobx";
import { model, Model, tProp, types, ExtendedModel } from "mobx-keystone";

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
}) {}

/**
 * {
  "id": "83341a96-811e-4f64-8903-38fcf11dfec8",
  "name": "Nova turma",
  "active": true,
  "create_date": "2021-06-04T02:09:31.907Z",
  "teacher_name": "José Vinicius",
  "coins_max": 210,
  "student_info": {
    "student_id": "b77b0d3e-5151-45fc-82e0-73ae4e6fdf40",
    "user_id": "5ff527ef-8f3e-450b-9813-f5af15a878b7",
    "photo": null,
    "nickname": null,
    "current_coins_qty": 0,
    "current_avatar": "mario"
  }
}
 */
