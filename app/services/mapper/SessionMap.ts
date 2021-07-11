import { Session } from "../../store/sessions-store/session";
import { User } from "../../store/sessions-store/user";
import { ISessionResponseDTO } from "../api/dtos";

export class SessionMap {
  static toMobxInstance(session: ISessionResponseDTO): Session {
    return new Session({
      user: session.user ? new User(session.user) : null,
      token: session.token,
    });
  }

  static toDTO(session: Session): ISessionResponseDTO {
    return {
      token: session.token,
      user: !!session.user
        ? {
            email: session.user.email,
            id: session.user.id,
            name: session.user.id,
            nickname: session.user.nickname,
            photo_url: session.user.photo_url,
            role: session.user.role,
          }
        : null,
    };
  }
}
