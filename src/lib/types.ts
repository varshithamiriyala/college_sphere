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
