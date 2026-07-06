
export interface TimetableEntry {
  day: string;
  time: string;
  room: string;
  batch: string;
  subject: string;
  faculty: string;
}

export interface Faculty {
  id: string;
  name: string;
  avatar: string;
  title: string;
  department: string;
  workingHours: { start: string; end: string };
  leaveDates: Date[];
  submissions: {
    marks: number;
    assignments: number;
    attendance: number;
  };
}

export type GeneratedTimetable = {
  timetable: TimetableEntry[];
};

export type LeaveRequestStatus = 'pending' | 'approved' | 'rejected';

export interface LeaveRequest {
  id: string;
  facultyId: string;
  facultyName: string;
  facultyAvatar: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: LeaveRequestStatus;
}
