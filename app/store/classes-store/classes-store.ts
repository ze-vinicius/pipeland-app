import { isEqual } from "date-fns";
import {
  model,
  Model,
  modelFlow,
  _async,
  _await,
  prop,
  getRootStore,
  modelAction,
} from "mobx-keystone";
import { api } from "../../services/api/api";
import utils from "../../utils";
import { formatDate } from "../../utils/date";
import { GameElement } from "../game-element-store/game-element";
import { RootStore } from "../root-store/root-store";
import { Class, ClassDetail } from "./class";
import { AttendanceList } from "./student";
import { TaskDetail } from "./task";

interface LoadingPages {
  classes: boolean;
  tasks: boolean;
  taskDetails: boolean;
  classInfo: boolean;
  classRanking: boolean;
  attendance: boolean;
  taskCorrections: boolean;
}

@model("pipeland/ClassesStore")
export class ClassesStore extends Model({
  isLoading: prop<LoadingPages>(() => ({
    classes: false,
    tasks: false,
    taskDetails: false,
    classInfo: false,
    classRanking: false,
    attendance: false,
    taskCorrections: false,
  })),
  classes: prop<Class[]>(() => []),
  selectedClass: prop<ClassDetail | null>(null),
  selectedClassIsLoading: prop<boolean>(false),
  taskDetail: prop<TaskDetail | null>(null),
  taskDetailIsLoading: prop<boolean>(false),
  errorMessage: prop<string | null>(null).withSetter(),
}) {
  @modelFlow
  createClass = _async(function* (
    this: ClassesStore,
    {
      name,
    }: {
      name: string;
    }
  ) {
    this.isLoading.classes = true;

    try {
      const newClass = yield* _await(api.createClass({ name }));

      this.classes.push(newClass);
    } catch (error: any) {
      if (__DEV__) {
        console.log(error);
      }
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      if (err.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    } finally {
      this.isLoading.classes = false;
    }
  });

  @modelFlow
  joinClass = _async(function* (
    this: ClassesStore,
    {
      class_invite_token,
    }: {
      class_invite_token: string;
    }
  ) {
    this.isLoading.classes = true;

    try {
      const newClass = yield* _await(api.joinClass({ class_invite_token }));

      this.classes.push(newClass);
    } catch (error: any) {
      if (__DEV__) {
        console.log(error);
      }
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      if (err.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    } finally {
      this.isLoading.classes = false;
    }
  });

  @modelFlow
  fetchClasses = _async(function* (this: ClassesStore) {
    this.isLoading.classes = true;

    try {
      const classes = yield* _await(api.getClasses());

      this.classes = classes;
    } catch (error: any) {
      if (__DEV__) {
        console.log(error);
      }
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      if (err.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    } finally {
      this.isLoading.classes = false;
    }
  });

  @modelFlow
  fetchClassInfo = _async(function* (this: ClassesStore, class_id: string) {
    this.isLoading.classInfo = true;

    try {
      const selectedClass = yield* _await(api.getClassDetail(class_id));

      this.selectedClass = selectedClass;
    } catch (error: any) {
      if (__DEV__) {
        console.log(error);
      }
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      if (err.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    } finally {
      this.isLoading.classInfo = false;
    }
  });

  @modelFlow
  fetchClassTasks = _async(function* (this: ClassesStore, class_id?: string) {
    this.isLoading.tasks = true;

    const id = class_id || this.selectedClass?.id || "";

    try {
      const tasks = yield* _await(api.getClassTasks(id));

      if (this.selectedClass) {
        this.selectedClass.tasks = tasks;
      }
    } catch (error: any) {
      if (__DEV__) {
        console.log(error);
      }
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      if (err.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    } finally {
      this.isLoading.tasks = false;
    }
  });

  @modelFlow
  fetchStudentCard = _async(function* (this: ClassesStore) {
    const id = this.selectedClass?.id;

    if (!id) return;

    try {
      const classDetail = yield* _await(api.getClassDetail(id));

      if (this.selectedClass) {
        this.selectedClass.setStudent_info(classDetail.student_info);
      }
    } catch (error: any) {
      if (__DEV__) {
        console.log(error);
      }
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      if (err.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    }
  });

  @modelFlow
  fetchTaskDetails = _async(function* (
    this: ClassesStore,
    {
      task_id,
    }: {
      task_id: string;
    }
  ) {
    this.isLoading.taskDetails = true;

    try {
      const taskDetail = yield* _await(
        api.getTaskDetail({
          task_id,
        })
      );

      this.taskDetail = taskDetail;
    } catch (error: any) {
      if (__DEV__) {
        console.log(error);
      }
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      if (err.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    } finally {
      this.isLoading.taskDetails = false;
    }
  });

  @modelFlow
  fetchClassRanking = _async(function* (this: ClassesStore) {
    this.isLoading.classRanking = true;

    if (!this.selectedClass) return;

    try {
      const classRanking = yield* _await(
        api.getClassRanking({
          class_id: this.selectedClass.id,
        })
      );

      this.selectedClass.classRanking = classRanking;
    } catch (error: any) {
      if (__DEV__) {
        console.log(error);
      }
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      if (err.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    } finally {
      this.isLoading.classRanking = false;
    }
  });

  @modelFlow
  fetchDayAttendanceList = _async(function* (
    this: ClassesStore,
    date: Date | string
  ) {
    this.isLoading.attendance = true;

    const formattedDate = formatDate(date, "yyyy-MM-dd");

    if (!this.selectedClass) return;

    const findDayAttendanceList = this.selectedClass.attendancesList.find(
      (attendance) =>
        isEqual(new Date(formattedDate), new Date(attendance.date))
    );

    if (!!findDayAttendanceList) {
      this.selectedClass.selectedDayAttendanceList = findDayAttendanceList;
      return;
    }

    try {
      const attendances = yield* _await(
        api.getDayAttendanceList({
          class_id: this.selectedClass.id,
          date: formattedDate,
        })
      );

      const newAttendance = new AttendanceList({
        date: formattedDate,
        is_saved: attendances.is_saved,
        students: attendances.student_attendances,
      });

      // this.selectedClass.attendancesList.push(newAttendance);
      this.selectedClass.selectedDayAttendanceList = newAttendance;
    } catch (error: any) {
      if (__DEV__) {
        console.log(error);
      }
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      if (err.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    } finally {
      this.isLoading.attendance = false;
    }
  });

  @modelFlow
  saveDayAttendanceList = _async(function* (this: ClassesStore) {
    this.isLoading.attendance = true;

    if (!this.selectedClass) return;

    try {
      const dayAttendanceList = this.selectedClass.selectedDayAttendanceList;

      if (!dayAttendanceList) return;

      const formatedRequestBody = {
        class_id: this.selectedClass.id,
        date: dayAttendanceList.date,
        students: dayAttendanceList.students.map((student) => ({
          student_id: student.student_id,
          is_present: student.is_present,
        })),
      };

      yield* _await(api.updateDayAttendanceList(formatedRequestBody));
      this.selectedClass.selectedDayAttendanceList?.setIs_saved(true);
    } catch (error: any) {
      if (__DEV__) {
        console.log(error);
      }
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      if (err.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    } finally {
      this.isLoading.attendance = false;
    }
  });

  @modelFlow
  createTask = _async(function* (
    this: ClassesStore,
    data: {
      title: string;
      description: string;
      delivery_date: Date;
      start_date?: Date;
      task_elements: Array<GameElement>;
    }
  ) {
    this.isLoading.tasks = true;

    const id = this.selectedClass?.id || "";

    const task_elements = data.task_elements.map((element) => ({
      game_element_id: element.id,
      quantity: 1,
    }));

    try {
      const task = yield* _await(
        api.createTask({
          class_id: id,
          ...data,
          task_elements,
        })
      );

      if (this.selectedClass) {
        this.selectedClass.tasks.unshift(task);
      }
    } catch (error: any) {
      if (__DEV__) {
        console.log(error);
      }
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      if (err.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    } finally {
      this.isLoading.tasks = false;
    }
  });

  @modelFlow
  fetchTaskCorrections = _async(function* (this: ClassesStore) {
    this.isLoading.taskCorrections = true;

    if (!this.taskDetail) {
      return;
    }

    try {
      const students_task_corrections = yield* _await(
        api.getStudentsTaskCorrections(this.taskDetail.id)
      );

      this.taskDetail.students_task_corrections = students_task_corrections;
    } catch (error: any) {
      if (__DEV__) {
        console.log(error);
      }
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      if (err.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    } finally {
      this.isLoading.taskCorrections = false;
    }
  });

  @modelFlow
  saveTaskCorrection = _async(function* (
    this: ClassesStore,
    {
      coins,
      delivered_date,
      got_shell,
      comment,
      student_id,
      autobombs_qty,
    }: {
      student_id: string;
      coins: number;
      autobombs_qty?: number;
      comment: string;
      delivered_date: Date | undefined;
      got_shell: boolean;
    }
  ) {
    this.isLoading.taskCorrections = true;

    if (!this.taskDetail) {
      return;
    }

    try {
      yield* _await(
        api.postTaskCorrection({
          task_id: this.taskDetail.id,
          coins,
          delivered_date,
          comment,
          got_shell,
          student_id,
          autobombs_qty,
        })
      );
    } catch (error: any) {
      if (__DEV__) {
        console.log(error);
      }
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      if (err.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    } finally {
      this.isLoading.taskCorrections = false;
    }
  });

  @modelAction
  handleChangeStudentAttendance = ({
    student_id,
    is_present,
  }: {
    student_id: string;
    is_present: boolean;
  }) => {
    if (!this.selectedClass?.selectedDayAttendanceList) return;

    this.selectedClass.selectedDayAttendanceList.students.forEach((student) => {
      if (student.student_id === student_id) {
        student.changeStudentAttendance(is_present);
      }
    });
  };
}
