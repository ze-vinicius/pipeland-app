import axios, { AxiosInstance } from "axios";
import {
  StudentAttendance,
  StudentInfo,
} from "../../store/classes-store/student";
import {
  StudentTaskCorrection,
  TaskCorrection,
  TaskCorrectionElement,
  Task,
  TaskElement,
} from "../../store/classes-store/task";
import { GameElement } from "../../store/game-element-store/game-element";
import { User } from "../../store/sessions-store/user";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";
import {
  IAttendanceListResponseDTO,
  ISessionResponseDTO,
  IStudentResponseDTO,
  IUserResponseDTO,
} from "./dtos";

import * as ResponseTypes from "./response-types";

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
  }): Promise<ISessionResponseDTO> {
    const response = await this.axios.post("sessions", {
      email,
      password,
    });

    const { user, token } = response.data;

    this.axios.defaults.headers.authorization = `Bearer ${token}`;

    // const session = new Session({
    //   user: new User({
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //     role: user.role,
    //   }),
    //   token,
    // });

    return {
      user,
      token,
    };
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
  }): Promise<IUserResponseDTO> {
    const response = await this.axios.post("users", {
      name,
      role,
      email,
      password,
    });

    const raw = response.data;

    const user = {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      role: raw.role,
      nickname: raw.nickname,
      photo_url: raw.photo_url,
    };

    return user;
  }

  async getClassDetail(
    class_id: string
  ): Promise<ResponseTypes.ClassDetailDTO> {
    const response = await this.axios.get<ResponseTypes.ClassDetailDTO>(
      `/classes/${class_id}`
    );

    return response.data;

    // const mapResponseToClassDetail = (raw: any): Class => {
    //   const student_info = raw.student_info
    //     ? new StudentInfo({
    //         student_id: raw.student_info.student_id,
    //         user_id: raw.student_info.user_id,
    //         student_name: raw.student_info.student_name,
    //         current_avatar: raw.student_info.current_avatar,
    //         current_coinst_qty: raw.student_info.current_coins_qty,
    //         current_mushroom_ups_qty: raw.student_info.current_mushroom_ups_qty,
    //         attendances_count: raw.student_info.attendances_count,
    //       })
    //     : null;

    //   return new Class({
    //     id: raw.id,
    //     name: raw.name,
    //     active: raw.active,
    //     teacherName: raw.teacher_name,
    //     createDate: raw.create_date,
    //     coinsMax: raw.coins_max,
    //     inviteToken: raw.invite_token,
    //     studentInfo: student_info,
    //   });
    // };

    // const selectedClass = mapResponseToClassDetail(response.data);

    // return selectedClass;
  }

  async getClasses(): Promise<ResponseTypes.ClassResumeDTO[]> {
    const response = await this.axios.get<ResponseTypes.ClassResumeDTO[]>(
      "/classes"
    );

    // const mapResponseToClass = (raw: any): Class => {
    //   return new Class({
    //     id: raw.id,
    //     name: raw.name,
    //     active: raw.active,
    //     teacherName: raw.teacher_name,
    //     createDate: raw.create_date,
    //   });
    // };

    // const classes: Class[] = response.data.map(mapResponseToClass);

    return response.data;
  }

  async getClassTasks(class_id: string): Promise<Task[]> {
    const response = await api.axios.get(`/classes/${class_id}/tasks`);

    const tasks: Task[] = response.data.map((raw: any): Task => {
      return new Task({
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
    start_date?: Date;
    task_elements: Array<{
      game_element_id: string;
      quantity: number;
    }>;
  }): Promise<Task> {
    const response = await api.axios.post(
      `/classes/${class_id}/tasks`,
      requestBody
    );

    const raw = response.data;

    const task: Task = new Task({
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

  async getTaskDetails({ task_id }: { task_id: string }): Promise<Task> {
    const response = await this.axios.get(`/tasks/${task_id}`);

    const taskDetail = new Task({
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

  async createClass({ name }: { name: string }) {
    const response = await this.axios.post("/classes/", {
      name,
    });

    return response.data;

    // const newClass = new Class({
    //   id: response.data.id,
    //   name: response.data.name,
    //   active: response.data.active,
    //   createDate: response.data.create_date,
    //   teacherName: response.data.teacher_name,
    // });

    // return newClass;
  }

  async joinClass({ class_invite_token }: { class_invite_token: string }) {
    const response = await this.axios.post("/classes/join", {
      class_invite_token,
    });

    return response.data;

    // const newClass = new Class({
    //   id: response.data.id,
    //   name: response.data.name,
    //   active: response.data.active,
    //   createDate: response.data.create_date,
    //   teacherName: response.data.teacher_name,
    // });

    // return newClass;
  }

  async getClassRanking({ class_id }: { class_id: string }) {
    const response = await this.axios.get(`/classes/${class_id}/ranking`);

    // const classRanking = response.data.map(
    //   (raw: any) =>
    //     new StudentRanking({
    //       rankingPosition: raw.ranking,
    //       currentCoinsQty: raw.current_coins_qty,
    //       name: raw.name,
    //       studentId: raw.student_id,
    //       userId: raw.user_id,
    //       nickname: raw.nickname,
    //       photo: raw.photo,
    //     })
    // );

    return response.data.map((student: any) => ({
      rankingPosition: student.ranking,
      currentCoinsQty: student.current_coins_qty,
      studentId: student.student_id,
    }));
  }

  async getDayAttendanceList({
    class_id,
    date,
  }: {
    class_id: string;
    date: string;
  }): Promise<IAttendanceListResponseDTO> {
    const response = await this.axios.get(
      `/classes/${class_id}/attendance-list`,
      {
        params: {
          date,
        },
      }
    );

    // const student_attendances = response.data.student_attendances.map(
    //   (raw: any) =>
    //     new StudentAttendance({
    //       // id: raw.id,
    //       // class_i/d: raw.class_id,
    //       // date: raw.date,
    //       // is_present: raw.is_present,
    //       // student_id: raw.student_id,
    //       // name: raw.name,
    //       // photo: raw.photo,
    //     })
    // );

    return {
      is_saved: response.data.is_saved,
      date: response.data.date,
      students_attendances: response.data.students_attendances.map(
        (student: any) => ({
          is_present: student.is_present,
          student_id: student.student_id,
        })
      ),
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
    autobombs_qty,
    comment,
  }: {
    task_id: string;
    student_id: string;
    coins: number;
    autobombs_qty?: number;
    comment: string;
    delivered_date: Date | undefined;
    got_shell: boolean;
  }) {
    await this.axios.post(`/tasks/${task_id}/corrections`, {
      coins,
      delivered_date,
      got_shell,
      student_id,
      comment,
      autobombs_qty,
    });
  }

  async fetchSessionInfo(): Promise<IUserResponseDTO> {
    const resp = await this.axios.get("/sessions");

    return {
      id: resp.data.id,
      email: resp.data.email,
      name: resp.data.name,
      role: resp.data.role,
      nickname: resp.data.nickname,
      photo_url: resp.data.photo_url,
    };
  }

  async getClassStudents({
    class_id,
  }: {
    class_id: string;
  }): Promise<Array<IStudentResponseDTO>> {
    const resp = await this.axios.get(`/classes/${class_id}/students`);

    return resp.data;
  }

  async updateUserPhoto({ uri }: { uri: string }): Promise<void> {
    let uriArray = uri.split(".");
    let fileType = uriArray[uriArray.length - 1];

    let filename = uri.split("/").pop();

    let formData = new FormData();

    formData.append(
      "photo",
      JSON.parse(
        JSON.stringify({
          uri,
          name: `${filename}`,
          type: `image/${fileType}`,
        })
      )
    );

    const resp = await this.axios.patch(`/users/photo`, formData);

    // return resp.d/ata;
  }
}

const api = new Api();

export { api, Api };
