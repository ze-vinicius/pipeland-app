import { IUserResponseDTO } from "./IUserResponseDTO";

export interface ISessionResponseDTO {
  token: string | null;
  user: IUserResponseDTO | null;
}
