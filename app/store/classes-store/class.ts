import {
  model,
  Model,
  tProp,
  types,
  ExtendedModel,
  prop,
  modelAction,
} from "mobx-keystone";
import { TaskResume } from "./task";

enum EnumMarioAvatars {
  MARIO = "mario",
  SUPER_MARIO = "superMario",
  FIRE_MARIO = "fireMario",
  CAPE_MARIO = "capeMario",
}

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
  students: prop<Array<StudentAttendance>>(() => []),
}) {}

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

@model("pipeland/StudentRanking")
export class StudentRanking extends Model({
  ranking: prop<number>(),
  student_id: prop<string>(),
  name: prop<string>(),
  user_id: prop<string>(),
  nickname: prop<string | null>(null),
  photo: prop<string | null>(null),
  current_coins_qty: prop<number>(),
}) {}

@model("pipeland/ClassDetail")
export class ClassDetail extends ExtendedModel(Class, {
  coins_max: prop<number>(),
  invite_token: prop<string | null>(null),
  student_info: prop<StudentInfo | null>(null),
  tasks: prop<TaskResume[]>(() => []),
  classRanking: prop<StudentRanking[]>(() => []),
  attendancesList: prop<AttendanceList[]>(() => []),
  selectedDayAttendanceList: prop<AttendanceList | null>(null),
}) {}
