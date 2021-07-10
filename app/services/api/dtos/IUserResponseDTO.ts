import { USER_ROLES } from "../../../store/sessions-store/user";

export interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: keyof typeof USER_ROLES;
  nickname: string | undefined;
  photo_url: string | undefined;
}
