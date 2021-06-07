import { computed } from "mobx";
import {
  model,
  Model,
  modelAction,
  tProp,
  types,
  modelFlow,
  _async,
  _await,
} from "mobx-keystone";
import api from "../../services/api/api";
import { Class, ClassDetail, StudentInfo } from "./class";

const mapResponseToClass = (raw: any): Class => {
  return new Class({
    id: raw.id,
    name: raw.name,
    active: raw.active,
    teacher_name: raw.teacher_name,
    create_date: raw.create_date,
  });
};

const mapResponseToClassDetail = (raw: any): ClassDetail => {
  const student_info = raw.student_info
    ? new StudentInfo({
        student_id: raw.student_info.student_id,
        user_id: raw.student_info.user_id,
        student_name: raw.student_info.student_name,
        current_avatar: raw.student_info.current_avatar,
        current_coinst_qty: raw.student_info.current_coins_qty,
        nickname: raw.student_info.nickname,
        photo: raw.student_info.photo,
        current_mushroom_ups_qty: raw.student_info.current_mushroom_ups_qty,
      })
    : null;

  return new ClassDetail({
    id: raw.id,
    name: raw.name,
    active: raw.active,
    teacher_name: raw.teacher_name,
    create_date: raw.create_date,
    coins_max: raw.coins_max,
    student_info,
  });
};

@model("pipeland/ClassesStore")
export class ClassesStore extends Model({
  isLoading: tProp(types.boolean, () => false),
  classes: tProp(types.array(types.model(Class)), () => []),
  selectedClass: tProp(types.maybeNull(types.model(ClassDetail)), () => null),
  errorMessage: tProp(types.maybeNull(types.string), () => null),
}) {
  @modelFlow
  fetchClasses = _async(function* (this: ClassesStore) {
    this.isLoading = true;

    try {
      const response = yield* _await(api.get("/classes"));

      const classes: Class[] = response.data.map(mapResponseToClass);

      this.classes = classes;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        this.errorMessage = error.response.data.error;
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
      const response = yield* _await(api.get(`/classes/${class_id}`));

      const selectedClass = mapResponseToClassDetail(response.data);

      this.selectedClass = selectedClass;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        this.errorMessage = error.response.data.error;
      } else {
        this.errorMessage = error.message;
      }
    } finally {
      this.isLoading = false;
    }
  });

  // @computed
  // get done() {
  //   return this.todos.filter((t) => t.done);
  // }
  // @modelAction
  // add(todo: Todo) {
  //   this.todos.push(todo);
  // }
  // @modelAction
  // remove(todo: Todo) {
  //   const index = this.todos.indexOf(todo);
  //   if (index >= 0) {
  //     this.todos.splice(index, 1);
  //   }
  // }
}
