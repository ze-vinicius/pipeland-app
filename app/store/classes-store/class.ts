import { model, Model, ExtendedModel, prop } from "mobx-keystone";
import { AttendanceList, StudentInfo } from "./student";
import { TaskResume } from "./task";
@model("pipeland/Class")
export class Class extends Model({
  id: prop<string>(),
  name: prop<string>(),
  active: prop<boolean>(),
  create_date: prop<string>(),
  teacher_name: prop<string>(),
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
