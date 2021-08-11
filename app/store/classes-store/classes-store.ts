import { isEqual } from "date-fns";
import { computed } from "mobx";
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
import { Class } from "./class";
import { AttendanceList, StudentInfo } from "./student";
import { Task } from "./task";

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
  selectedClassId: prop<string | null>(null).withSetter(),
  selectedTaskId: prop<string | null>(null).withSetter(),
  studentInfo: prop<StudentInfo | null>(null),
  errorMessage: prop<string | null>(null).withSetter(),
}) {
  @modelAction
  setIsLoading(key: keyof LoadingPages, value: boolean) {
    this.isLoading[key] = value;
  }

  @modelAction
  setClasses(classes: any) {
    this.classes = classes.map(
      (c: any) =>
        new Class({
          active: c.active,
          createDate: c.create_date,
          id: c.id,
          name: c.name,
          teacherName: c.teacher_name,
        })
    );
  }

  @modelAction
  setStudentInfo(student_info: any) {
    this.studentInfo = !!student_info
      ? new StudentInfo({
          user_id: student_info.user_id,
          current_avatar: student_info.current_avatar,
          current_coinst_qty: student_info.current_coins_qty,
          student_id: student_info.student_id,
          student_name: student_info.student_name,
          attendances_count: student_info.attendances_count,
          current_mushroom_ups_qty: student_info.current_mushroom_ups_qty,
        })
      : null;
  }

  @computed
  get selectedClass() {
    return this.classes.find((c) => c.id === this.selectedClassId);
  }

  @computed
  get selectedTask() {
    return this.selectedClass?.tasks.find(
      (task) => task.id === this.selectedTaskId
    );
  }

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

      // this.classes.push(newClass);
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

      // this.classes.push(newClass);
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

      this.setClasses(classes);
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
  fetchClassDetails = _async(function* (this: ClassesStore, class_id: string) {
    this.setIsLoading("classInfo", true);

    try {
      const selectedClass = yield* _await(api.getClassDetail(class_id));

      const selectedClassIdx = this.classes.findIndex(
        (c) => c.id === selectedClass.id
      );

      if (selectedClassIdx >= 0) {
        Object.assign(this.classes[selectedClassIdx], {
          coinsMax: selectedClass.coins_max,
          inviteToken: selectedClass.invite_token,
        });

        this.setStudentInfo(selectedClass.student_info);
      } else {
        this.classes.push(
          new Class({
            active: selectedClass.active,
            createDate: selectedClass.create_date,
            id: selectedClass.id,
            name: selectedClass.name,
            teacherName: selectedClass.teacher_name,
          })
        );
      }

      this.setSelectedClassId(selectedClass.id);
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
      this.setIsLoading("classInfo", false);
    }
  });

  @modelFlow
  fetchStudentCard = _async(function* (this: ClassesStore) {
    const id = this.selectedClass?.id;

    if (!id) return;

    try {
      const classDetail = yield* _await(api.getClassDetail(id));

      this.setStudentInfo(classDetail.student_info);
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
    this.setIsLoading("taskDetails", true);

    try {
      const taskDetail = yield* _await(
        api.getTaskDetails({
          task_id,
        })
      );

      if (!!this.selectedClass) {
        const taskIdx = this.selectedClass.tasks.findIndex(
          (task) => task.id === taskDetail.id
        );

        if (taskIdx >= 0) {
          this.selectedClass.tasks[taskIdx] = taskDetail;
        } else {
          this.selectedClass.tasks.push(taskDetail);
        }

        this.setSelectedTaskId(taskDetail.id);
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
      this.setIsLoading("taskDetails", false);
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
  deleteTask = _async(function* (
    this: ClassesStore,
    data: {
      task_id: string;
    }
  ) {
    this.isLoading.taskDetails = true;

    try {
      yield* _await(
        api.deleteTask({
          ...data,
        })
      );

      if (this.selectedClass) {
        this.selectedClass.tasks = this.selectedClass.tasks.filter(
          (task) => task.id !== data.task_id
        );
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
      this.isLoading.taskDetails = false;
    }
  });

  @modelFlow
  updateTask = _async(function* (
    this: ClassesStore,
    data: {
      id: string;
      title: string;
      description: string;
      delivery_date: Date;
      start_date?: Date;
      task_elements: Array<GameElement>;
    }
  ) {
    this.isLoading.tasks = true;

    const task_elements = data.task_elements.map((element) => ({
      game_element_id: element.id,
      quantity: 1,
    }));

    try {
      const updatedTask = yield* _await(
        api.updateTask({
          ...data,
          task_elements,
        })
      );

      if (this.selectedClass) {
        const findTaskIdx = this.selectedClass.tasks.findIndex(
          (task) => task.id === data.id
        );

        if (findTaskIdx >= 0) {
          this.selectedClass.tasks[findTaskIdx] = updatedTask;
        }
      }

      // if (this.selectedClass) {
      //   this.selectedClass.tasks.unshift(task);
      // }
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

    if (!this.selectedTask) {
      return;
    }

    try {
      const students_task_corrections = yield* _await(
        api.getStudentsTaskCorrections(this.selectedTask.id)
      );

      this.selectedTask.setStudentsTasksCorrections(students_task_corrections);
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

    if (!this.selectedTask) {
      return;
    }

    try {
      yield* _await(
        api.postTaskCorrection({
          task_id: this.selectedTask.id,
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
    studentId,
    isPresent,
  }: {
    studentId: string;
    isPresent: boolean;
  }) => {
    if (!this.selectedClass?.selectedAttendanceList) return;

    this.selectedClass.selectedAttendanceList.students.forEach((student) => {
      if (student.studentId === studentId) {
        student.changeStudentAttendance(isPresent);
      }
    });
  };
}
