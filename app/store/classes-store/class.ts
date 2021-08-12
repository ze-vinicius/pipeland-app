import { computed } from "mobx";
import {
  model,
  Model,
  ExtendedModel,
  prop,
  modelAction,
  modelFlow,
  _async,
  getRootStore,
  _await,
} from "mobx-keystone";
import { api } from "../../services/api/api";
import { AttendanceListMap } from "../../services/mapper/AttendanceListMaper";
import utils from "../../utils";
import { formatDate } from "../../utils/date";
import { RootStore } from "../root-store/root-store";
import { AttendanceList, Student, StudentInfo } from "./student";
import { Task, TaskCorrection } from "./task";

@model("pipeland/ClassResume")
export class ClassResume extends Model({
  id: prop<string>(),
  name: prop<string>(),
  active: prop<boolean>(),
  createDate: prop<string>(),
  teacherName: prop<string>(),
}) {}

@model("pipeland/Class")
export class Class extends ExtendedModel(ClassResume, {
  coinsMax: prop<number | null>(null).withSetter(),
  inviteToken: prop<string | null>(null).withSetter(),
  studentInfo: prop<StudentInfo | null>(null).withSetter(),
  tasks: prop<Task[]>(() => []).withSetter(),
  students: prop<Student[]>(() => []).withSetter(),
  tasksCorrections: prop<TaskCorrection[]>(() => []).withSetter(),
  selectedAttendanceList: prop<AttendanceList | undefined>(undefined),
}) {
  @modelAction
  handleError(error: any) {
    if (__DEV__) {
      console.log(error);
    }

    const err = utils.handleResponseError(error);

    this.rootStore?.classesStore.setErrorMessage(err.message);

    if (err.status === 401) {
      this.rootStore?.sessionsStore.logout();
    }
    setTimeout(() => {
      this.rootStore?.classesStore.setErrorMessage("");
    }, 3000);
  }

  @computed
  get rootStore() {
    return getRootStore<RootStore>(this);
  }

  @computed
  get selectedAttendanceListDetails() {
    return this.selectedAttendanceList
      ? {
          ...this.selectedAttendanceList,
          students: this.selectedAttendanceList.students.map((student) => {
            const studentInfo = this.students.find(
              (s) => s.id === student.studentId
            );

            return {
              isPresent: student.isPresent,
              studentId: student.studentId,
              name: studentInfo?.name,
              photoUrl: studentInfo?.photo_url,
            };
          }),
        }
      : undefined;
  }

  @computed
  get classRanking() {
    return this.students
      .map((student) => ({
        rankingPosition: Number(student.rankingPosition),
        currentCoinsQty: student.currentCoinsQty,
        studentId: student.id,
        name: student.name,
        userId: student.userId,
        nickname: student.nickname,
        photo_url: student.photo_url,
      }))
      .sort((a, b) => {
        return Number(a.rankingPosition) - Number(b.rankingPosition);
      });
  }

  @modelAction
  setRanking(
    data: Array<{
      studentId: string;
      rankingPosition: number;
      currentCoinsQty: number;
    }>
  ) {
    this.students.forEach((student) => {
      const studentRanking = data.find((s) => s.studentId === student.id);
      student.rankingPosition = studentRanking?.rankingPosition;
      student.currentCoinsQty = studentRanking?.currentCoinsQty;
    });
  }

  @modelFlow
  fetchStudents = _async(function* (this: Class) {
    this.rootStore?.classesStore.setIsLoading("tasks", true);

    try {
      const students = yield* _await(
        api.getClassStudents({ class_id: this.id })
      );

      this.setStudents(
        students.map(
          (student) =>
            new Student({
              id: student.id,
              classId: student.class_id,
              email: student.email,
              name: student.name,
              nickname: student.nickname,
              photo: student.photo,
              photo_url: student.photo_url,
              userId: student.user_id,
            })
        )
      );
    } catch (error: any) {
      this.handleError(error);
    } finally {
      this.rootStore?.classesStore.setIsLoading("tasks", false);
    }
  });

  @modelFlow
  fetchRanking = _async(function* (this: Class) {
    this.rootStore?.classesStore.setIsLoading("classRanking", true);

    try {
      const classRanking = yield* _await(
        api.getClassRanking({
          class_id: this.id,
        })
      );

      this.setRanking(classRanking);
    } catch (error: any) {
      this.handleError(error);
    } finally {
      this.rootStore?.classesStore.setIsLoading("classRanking", false);
    }
  });

  @modelFlow
  fetchTasks = _async(function* (this: Class) {
    this.rootStore?.classesStore.setIsLoading("tasks", true);

    try {
      const tasks = yield* _await(api.getClassTasks(this.id));

      this.setTasks(tasks);
    } catch (error: any) {
      this.handleError(error);
    } finally {
      this.rootStore?.classesStore.setIsLoading("tasks", false);
    }
  });

  @modelFlow
  fetchDayAttendanceList = _async(function* (this: Class, date: Date | string) {
    this.rootStore?.classesStore.setIsLoading("attendance", true);

    const formattedDate = formatDate(date, "yyyy-MM-dd");

    try {
      const attendanceList = yield* _await(
        api.getDayAttendanceList({
          class_id: this.id,
          date: formattedDate,
        })
      );

      const newAttendance = AttendanceListMap.toMobxInstance(attendanceList);

      this.selectedAttendanceList = newAttendance;
    } catch (error: any) {
      this.handleError(error);
    } finally {
      this.rootStore?.classesStore.setIsLoading("attendance", false);
    }
  });

  @modelFlow
  saveDayAttendanceList = _async(function* (this: Class) {
    this.rootStore?.classesStore.setIsLoading("attendance", true);

    try {
      const dayAttendanceList = this.selectedAttendanceList;

      if (!dayAttendanceList) return;

      const formatedRequestBody = {
        class_id: this.id,
        date: dayAttendanceList.date,
        students: dayAttendanceList.students.map((student) => ({
          student_id: student.studentId,
          is_present: student.isPresent,
        })),
      };

      yield* _await(api.updateDayAttendanceList(formatedRequestBody));
      this.selectedAttendanceList?.setIsSaved(true);
    } catch (error: any) {
      this.handleError(error);
    } finally {
      this.rootStore?.classesStore.setIsLoading("attendance", false);
    }
  });
}
