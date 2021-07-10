export interface IAttendanceListResponseDTO {
  is_saved: boolean;
  date: string;
  students_attendances: Array<{
    student_id: string;
    is_present: boolean;
  }>;
}
