import { User } from "../../store/sessions-store/user";
import { IUserResponseDTO } from "../api/dtos";

export class UserMap {
  static toMobxInstance(user: IUserResponseDTO): User {
    return new User(user);
  }

  static toDTO(user: User): IUserResponseDTO {
    return {
      email: user.email,
      id: user.id,
      name: user.id,
      nickname: user.nickname,
      photo_url: user.photo_url,
      role: user.role,
    };
  }
}
