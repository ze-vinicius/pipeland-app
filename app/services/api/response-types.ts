import { EnumMarioAvatars } from "../../store/classes-store/student";

export interface StudentDTO {
  id: string;
  name: string;
  nickname: string;
  photo: string;
  email: string;
  user_id: string;
  class_id: string;
}

export interface StudentInfoDTO
  extends Omit<StudentDTO, "name" | "id" | "class_id"> {
  student_id: string;
  student_name: string;
  current_avatar: EnumMarioAvatars;
  attendances_count: number;
  current_coins_qty: number;
  current_mushroom_ups_qty: number;
}

export interface ClassResumeDTO {
  id: string;
  name: string;
  active: boolean;
  status: string;
  teacher_name: string;
  create_date: string;
}

export interface ClassDetailDTO extends ClassResumeDTO {
  coins_max: number;
  invite_token: string;
  student_info: StudentInfoDTO | null;
}

export interface TaskElementDTO {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
}

export interface TaskResumeDTO {
  id: string;
  title: string;
  status: string;
  delivery_date: string;
  create_date: string;
  task_value: number;
  task_elements: TaskElementDTO[];
}
