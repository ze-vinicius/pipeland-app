import { model, Model, modelFlow, _async, _await, prop } from "mobx-keystone";
import { api } from "../../services/api/api";
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
