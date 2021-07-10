export interface IStudentResponseDTO {
  id: string;
  name: string;
  nickname: string | undefined;
  photo: string | undefined;
  photo_url: string | undefined;
  email: string;
  user_id: string;
  class_id: string;
}
