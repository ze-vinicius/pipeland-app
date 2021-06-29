import axios, { AxiosInstance, AxiosResponse } from "axios";
import { parseISO } from "date-fns";
import {
  Class,
  ClassDetail,
  StudentRanking,
} from "../../store/classes-store/class";
import {
  StudentAttendance,
  StudentInfo,
} from "../../store/classes-store/student";
import {
  StudentTaskCorrection,
  TaskCorrection,
  TaskCorrectionElement,
  TaskDetail,
  TaskElement,
  TaskResume,
} from "../../store/classes-store/task";
import { GameElement } from "../../store/game-element-store/game-element";
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

  async signUp({
    name,
    email,
    password,
    role,
  }: {
    name: string;
    email: string;
    password: string;
    role: string;
  }): Promise<User> {
    const response = await this.axios.post("users", {
      name,
      role,
      email,
      password,
    });

    const raw = response.data;

    const user = new User({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      role: raw.role,
    });

    return user;
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
            attendances_count: raw.student_info.attendances_count,
          })
        : null;

      return new ClassDetail({
        id: raw.id,
        name: raw.name,
        active: raw.active,
        teacher_name: raw.teacher_name,
        create_date: raw.create_date,
        coins_max: raw.coins_max,
        invite_token: raw.invite_token,
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
        create_date: raw.create_date,
        task_value: raw.task_value,
        status: raw.status,
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

  async createTask({
    class_id,
    ...requestBody
  }: {
    class_id: string;
    title: string;
    description: string;
    delivery_date: Date;
    task_elements: Array<{
      game_element_id: string;
      quantity: number;
    }>;
  }): Promise<TaskResume> {
    const response = await api.axios.post(
      `/classes/${class_id}/tasks`,
      requestBody
    );

    const raw = response.data;

    const task: TaskResume = new TaskResume({
      id: raw.id,
      title: raw.title,
      delivery_date: raw.delivery_date,
      create_date: raw.create_date,
      task_value: raw.task_value,
      status: raw.status,
      task_elements: raw.task_elements.map((task_element: any) => {
        return new TaskElement({
          id: task_element.id,
          name: task_element.name,
          quantity: task_element.quantity,
          imageUrl: task_element.imageUrl,
        });
      }),
    });

    return task;
  }

  async getTaskDetail({ task_id }: { task_id: string }): Promise<TaskDetail> {
    const response = await this.axios.get(`/tasks/${task_id}`);

    const taskDetail = new TaskDetail({
      id: response.data.id,
      create_date: response.data.create_date,
      delivery_date: response.data.delivery_date,
      description: response.data.description,
      task_value: response.data.task_value,
      title: response.data.title,
      status: response.data.status,
      task_correction: response.data.task_correction
        ? new TaskCorrection({
            id: response.data.task_correction.id,
            earned_coins: response.data.task_correction.earned_coins,
            comment: response.data.task_correction.comment,
            create_date: response.data.task_correction.created_at,
            student_id: response.data.task_correction.student_id,
            task_id: response.data.task_correction.task_id,
            applied_bonuses: response.data.task_correction.applied_bonuses.map(
              (applied_bonus: any) =>
                new TaskCorrectionElement({
                  id: applied_bonus.id,
                  imageUrl: applied_bonus.imageUrl,
                  name: applied_bonus.name,
                  type: applied_bonus.type,
                })
            ),
            applied_penalties:
              response.data.task_correction.applied_penalties.map(
                (applied_penalty: any) =>
                  new TaskCorrectionElement({
                    id: applied_penalty.id,
                    imageUrl: applied_penalty.imageUrl,
                    name: applied_penalty.name,
                    type: applied_penalty.type,
                  })
              ),
          })
        : undefined,
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

    const newClass = new Class({
      id: response.data.id,
      name: response.data.name,
      active: response.data.active,
      create_date: response.data.create_date,
      teacher_name: response.data.teacher_name,
    });

    return newClass;
  }

  async joinClass({
    class_invite_token,
  }: {
    class_invite_token: string;
  }): Promise<Class> {
    const response = await this.axios.post("/classes/join", {
      class_invite_token,
    });

    const newClass = new Class({
      id: response.data.id,
      name: response.data.name,
      active: response.data.active,
      create_date: response.data.create_date,
      teacher_name: response.data.teacher_name,
    });

    return newClass;
  }

  async getClassRanking({
    class_id,
  }: {
    class_id: string;
  }): Promise<StudentRanking[]> {
    const response = await this.axios.get<StudentRanking[]>(
      `/classes/${class_id}/ranking`
    );

    const classRanking = response.data.map(
      (raw: any) =>
        new StudentRanking({
          ranking: raw.ranking,
          current_coins_qty: raw.current_coins_qty,
          name: raw.name,
          student_id: raw.student_id,
          user_id: raw.user_id,
          nickname: raw.nickname,
          photo: raw.photo,
        })
    );

    return classRanking;
  }

  async getDayAttendanceList({
    class_id,
    date,
  }: {
    class_id: string;
    date: string;
  }): Promise<{
    is_saved: boolean;
    student_attendances: StudentAttendance[];
  }> {
    const response = await this.axios.get(
      `/classes/${class_id}/attendance-list`,
      {
        params: {
          date,
        },
      }
    );

    const student_attendances = response.data.student_attendances.map(
      (raw: any) =>
        new StudentAttendance({
          id: raw.id,
          class_id: raw.class_id,
          date: raw.date,
          is_present: raw.is_present,
          student_id: raw.student_id,
          name: raw.name,
          photo: raw.photo,
        })
    );

    return {
      is_saved: response.data.is_saved,
      student_attendances,
    };
  }

  async updateDayAttendanceList({
    class_id,
    date,
    students,
  }: {
    class_id: string;
    date: string | Date;
    students: Array<{
      student_id: string;
      is_present: boolean;
    }>;
  }): Promise<void> {
    await this.axios.put(`/classes/${class_id}/attendance-list`, {
      date,
      students,
    });
  }

  async getGameElements(): Promise<GameElement[]> {
    const response = await this.axios.get(`/classes/game-elements`);

    const gameElements = response.data.map(
      (raw: any) =>
        new GameElement({
          id: raw.id,
          description: raw.description,
          imageUrl: raw.imageUrl,
          name: raw.name,
          type: raw.type,
          value: raw.value,
        })
    );

    return gameElements;
  }

  async getStudentsTaskCorrections(
    task_id: string
  ): Promise<StudentTaskCorrection[]> {
    const response = await this.axios.get(`/tasks/${task_id}/corrections`);

    const student_task_corrections = response.data.map((raw: any) => {
      return new StudentTaskCorrection({
        id: raw.id,
        name: raw.name,
        photo: raw.photo,
        task_correction: raw.task_correction
          ? new TaskCorrection({
              id: raw.task_correction.id,
              earned_coins: raw.task_correction.earned_coins,
              comment: raw.task_correction.comment,
              create_date: raw.task_correction.created_at,
              student_id: raw.task_correction.student_id,
              task_id: raw.task_correction.task_id,
              applied_bonuses: raw.task_correction.applied_bonuses.map(
                (applied_bonus: any) =>
                  new TaskCorrectionElement({
                    id: applied_bonus.id,
                    imageUrl: applied_bonus.imageUrl,
                    name: applied_bonus.name,
                    type: applied_bonus.type,
                  })
              ),
              applied_penalties: raw.task_correction.applied_penalties.map(
                (applied_penalty: any) =>
                  new TaskCorrectionElement({
                    id: applied_penalty.id,
                    imageUrl: applied_penalty.imageUrl,
                    name: applied_penalty.name,
                    type: applied_penalty.type,
                  })
              ),
            })
          : undefined,
      });
    });

    return student_task_corrections;
  }

  async postTaskCorrection({
    coins,
    delivered_date,
    got_shell,
    student_id,
    task_id,
    comment,
  }: {
    task_id: string;
    student_id: string;
    coins: number;
    comment: string;
    delivered_date: Date | undefined;
    got_shell: boolean;
  }) {
    const response = await this.axios.post(`/tasks/${task_id}/corrections`, {
      coins,
      delivered_date,
      got_shell,
      student_id,
      comment,
    });
  }
}

const api = new Api();

export { api };
