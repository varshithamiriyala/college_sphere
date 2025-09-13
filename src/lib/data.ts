import type { Faculty, TimetableEntry } from './types';

export const facultyData: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Evelyn Reed',
    avatar: 'https://picsum.photos/seed/evelyn/200/200',
    title: 'Professor',
    department: 'Computer Science',
    workingHours: { start: '09:00', end: '17:00' },
    leaveDates: [],
    submissions: { marks: 98, assignments: 100, attendance: 95 },
  },
  {
    id: '2',
    name: 'Dr. Samuel Green',
    avatar: 'https://picsum.photos/seed/samuel/200/200',
    title: 'Associate Professor',
    department: 'Electrical Engineering',
    workingHours: { start: '10:00', end: '18:00' },
    leaveDates: [],
    submissions: { marks: 95, assignments: 92, attendance: 98 },
  },
  {
    id: '3',
    name: 'Dr. Marcus Hayes',
    avatar: 'https://picsum.photos/seed/marcus/200/200',
    title: 'Assistant Professor',
    department: 'Mechanical Engineering',
    workingHours: { start: '08:30', end: '16:30' },
    leaveDates: [],
    submissions: { marks: 88, assignments: 95, attendance: 90 },
  },
    {
    id: '4',
    name: 'Dr. Isabella Chen',
    avatar: 'https://picsum.photos/seed/isabella/200/200',
    title: 'Professor',
    department: 'Computer Science',
    workingHours: { start: '09:00', end: '17:00' },
    leaveDates: [],
    submissions: { marks: 99, assignments: 98, attendance: 97 },
    },
    {
    id: '5',
    name: 'Dr. Leo Patel',
    avatar: 'https://picsum.photos/seed/leo/200/200',
    title: 'Lecturer',
    department: 'Civil Engineering',
    workingHours: { start: '09:30', end: '17:30' },
    leaveDates: [],
    submissions: { marks: 91, assignments: 93, attendance: 94 },
    }
];

export const sampleTimetable: TimetableEntry[] = [];
