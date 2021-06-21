import {
  model,
  Model,
  modelFlow,
  _async,
  _await,
  prop,
  getRootStore,
} from "mobx-keystone";
import { api } from "../../services/api/api";
import { RootStore } from "../root-store/root-store";
import { Class, ClassDetail } from "./class";
import { TaskDetail } from "./task";

interface LoadingPages {
  classes: boolean;
  tasks: boolean;
  taskDetails: boolean;
  classInfo: boolean;
  classRanking: boolean;
}

@model("pipeland/ClassesStore")
export class ClassesStore extends Model({
  isLoading: prop<LoadingPages>(() => ({
    classes: false,
    tasks: false,
    taskDetails: false,
    classInfo: false,
    classRanking: false,
  })),
  classes: prop<Class[]>(() => []),
  selectedClass: prop<ClassDetail | null>(null),
  selectedClassIsLoading: prop<boolean>(false),
  taskDetail: prop<TaskDetail | null>(null),
  taskDetailIsLoading: prop<boolean>(false),
  errorMessage: prop<string | null>(null),
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
      console.log(error);
      if (error.response && error.response.data) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = error.message;
      }

      if (error.status === 401 || error.response.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }
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
      console.log(error);
      if (error.response && error.response.data) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = error.message;
      }

      if (error.status === 401 || error.response.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }
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
      console.log(error);
      if (error.response && error.response.data) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = error.message;
      }

      if (error.status === 401 || error.response.status === 401) {
        const rootStore = getRootStore<RootStore>(this);

        rootStore?.sessionsStore.logout();
      }
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
      console.log(error);
      if (error.response && error.response.data) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = error.message;
      }
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
      if (error.response && error.response.data) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = error.message;
      }
    } finally {
      this.isLoading.tasks = false;
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
      console.log(error);
      if (error.response && error.response.data) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = error.message;
      }
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
      console.log(error);
      if (error.response && error.response.data) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = error.message;
      }
    } finally {
      this.isLoading.classRanking = false;
    }
  });
}
