import { model, Model, prop, modelAction } from "mobx-keystone";

export enum EnumMarioAvatars {
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
  isPresent: prop<boolean>(),
  studentId: prop<string>(),
}) {
  @modelAction
  changeStudentAttendance = (isPresent: boolean) => {
    this.isPresent = isPresent;
  };
}

@model("pipeland/AttendanceList")
export class AttendanceList extends Model({
  date: prop<string>(),
  isSaved: prop<boolean>().withSetter(),
  students: prop<Array<StudentAttendance>>(() => []),
}) {}

@model("pipeland/Student")
export class Student extends Model({
  id: prop<string>(),
  name: prop<string>(),
  nickname: prop<string | undefined>(undefined),
  photo: prop<string | undefined>(undefined),
  photo_url: prop<string | undefined>(undefined),
  email: prop<string>(),
  userId: prop<string>(),
  classId: prop<string>(),
  rankingPosition: prop<number | undefined>(undefined),
  currentCoinsQty: prop<number | undefined>(undefined),
}) {}
