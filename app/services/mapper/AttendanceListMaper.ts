import {
  AttendanceList,
  StudentAttendance,
} from "../../store/classes-store/student";
import { IAttendanceListResponseDTO } from "../api/dtos";

export class AttendanceListMap {
  static toMobxInstance(
    attendanceList: IAttendanceListResponseDTO
  ): AttendanceList {
    return new AttendanceList({
      isSaved: attendanceList.is_saved,
      date: attendanceList.date,
      students: attendanceList.students_attendances.map(
        (student) =>
          new StudentAttendance({
            isPresent: student.is_present,
            studentId: student.student_id,
          })
      ),
    });
  }

  // static toDTO(session: IAttendanceListResponseDTO): AttendanceList {}
}
