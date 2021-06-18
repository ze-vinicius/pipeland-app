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

@model("pipeland/ClassesStore")
export class ClassesStore extends Model({
  isLoading: prop<boolean>(false),
  classes: prop<Class[]>(() => []),
  selectedClass: prop<ClassDetail | null>(null),
  taskDetail: prop<TaskDetail | null>(null),
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
    this.isLoading = true;

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
      this.isLoading = false;
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
    this.isLoading = true;

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
      this.isLoading = false;
    }
  });

  @modelFlow
  fetchClasses = _async(function* (this: ClassesStore) {
    this.isLoading = true;

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
      this.isLoading = false;
    }
  });

  @modelFlow
  fetchClassInfo = _async(function* (this: ClassesStore, class_id: string) {
    this.isLoading = true;

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
      this.isLoading = false;
    }
  });

  @modelFlow
  fetchClassTasks = _async(function* (this: ClassesStore, class_id?: string) {
    this.isLoading = true;

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
      this.isLoading = false;
    }
  });

  @modelFlow
  fetchTaskDetail = _async(function* (
    this: ClassesStore,
    {
      task_id,
      class_id,
    }: {
      task_id: string;
      class_id: string;
    }
  ) {
    this.isLoading = true;

    try {
      const taskDetail = yield* _await(
        api.getTaskDetail({
          task_id,
          class_id,
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
      this.isLoading = false;
    }
  });
}
