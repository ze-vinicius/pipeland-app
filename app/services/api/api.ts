import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  Class,
  ClassDetail,
  StudentInfo,
} from "../../store/classes-store/class";
import {
  TaskDetail,
  TaskElement,
  TaskResume,
} from "../../store/classes-store/task";
import { Session, User } from "../../store/sessions-store/session";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";

class Api {
  axios: AxiosInstance;

  config: ApiConfig;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;

    this.axios = axios.create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
    });
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Session> {
    const response = await this.axios.post("sessions", {
      email,
      password,
    });

    const { user, token } = response.data;

    this.axios.defaults.headers.authorization = `Bearer ${token}`;

    const session = new Session({
      user: new User({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }),
      token,
    });

    return session;
  }

  async getClassDetail(class_id: string) {
    const response = await this.axios.get(`/classes/${class_id}`);

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

    const selectedClass = mapResponseToClassDetail(response.data);

    return selectedClass;
  }

  async getClasses(): Promise<Class[]> {
    const response = await this.axios.get("/classes");

    const mapResponseToClass = (raw: any): Class => {
      return new Class({
        id: raw.id,
        name: raw.name,
        active: raw.active,
        teacher_name: raw.teacher_name,
        create_date: raw.create_date,
      });
    };

    const classes: Class[] = response.data.map(mapResponseToClass);

    return classes;
  }

  async getClassTasks(class_id: string): Promise<TaskResume[]> {
    const response = await api.axios.get(`/classes/${class_id}/tasks`);

    const tasks: TaskResume[] = response.data.map((raw: any): TaskResume => {
      return new TaskResume({
        id: raw.id,
        title: raw.title,
        delivery_date: raw.delivery_date,
        task_value: raw.task_value,
        task_elements: raw.task_elements.map((task_element: any) => {
          return new TaskElement({
            id: task_element.id,
            name: task_element.name,
            quantity: task_element.quantity,
            imageUrl: task_element.imageUrl,
          });
        }),
      });
    });

    return tasks;
  }

  async getTaskDetail({
    task_id,
    class_id,
  }: {
    task_id: string;
    class_id: string;
  }): Promise<TaskDetail> {
    const response = await this.axios.get(
      `/classes/${class_id}/tasks/${task_id}`
    );

    const taskDetail = new TaskDetail({
      id: response.data.id,
      create_date: response.data.create_date,
      delivery_date: response.data.delivery_date,
      description: response.data.description,
      task_value: response.data.task_value,
      title: response.data.title,
      task_elements: response.data.task_elements.map((task_element: any) => {
        return new TaskElement({
          id: task_element.id,
          name: task_element.name,
          quantity: task_element.quantity,
          imageUrl: task_element.imageUrl,
        });
      }),
    });

    return taskDetail;
  }

  async createClass({ name }: { name: string }): Promise<Class> {
    const response = await this.axios.post("/classes/", {
      name,
    });

    console.log({ response });

    const newClass = new Class({
      id: response.data.id,
      name: response.data.name,
      active: response.data.active,
      create_date: response.data.create_date,
      teacher_name: response.data.teacher_name,
    });

    return newClass;
  }
}

const api = new Api();

export { api };
