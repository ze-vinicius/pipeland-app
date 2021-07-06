import {
  model,
  Model,
  tProp,
  types,
  ExtendedModel,
  prop,
  modelAction,
} from "mobx-keystone";

enum EnumMarioAvatars {
  MARIO = "mario",
  SUPER_MARIO = "superMario",
  FIRE_MARIO = "fireMario",
  CAPE_MARIO = "capeMario",
}
@model("pipeland/StudentInfo")
export class StudentInfo extends Model({
  student_id: prop<string>(),
  user_id: prop<string>(),
  student_name: prop<string>(),
  current_coinst_qty: prop<number>(),
  current_avatar: prop<EnumMarioAvatars>(),
  current_mushroom_ups_qty: prop<number>(0),
  attendances_count: prop<number>(0),
}) {}
@model("pipeland/StudentAttendance")
export class StudentAttendance extends Model({
  id: prop<string | null>(null),
  is_present: prop<boolean>(),
  name: prop<string | null>(null),
  photo: prop<string | null>(null),
  date: prop<string>(),
  class_id: prop<string>(),
  student_id: prop<string>(),
}) {
  @modelAction
  changeStudentAttendance = (is_present: boolean) => {
    this.is_present = is_present;
  };
}

@model("pipeland/AttendanceList")
export class AttendanceList extends Model({
  date: prop<string>(),
  is_saved: prop<boolean>().withSetter(),
  students: prop<Array<StudentAttendance>>(() => []),
}) {}
