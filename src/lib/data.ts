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

export const sampleTimetable: TimetableEntry[] = [
  { day: 'Monday', time: '09:00-10:00', room: 'CR-101', batch: 'CS-A', subject: 'Data Structures', faculty: 'Dr. Evelyn Reed' },
  { day: 'Monday', time: '10:00-11:00', room: 'CR-102', batch: 'CS-B', subject: 'Algorithms', faculty: 'Dr. Isabella Chen' },
  { day: 'Monday', time: '11:00-12:00', room: 'LH-201', batch: 'EE-A', subject: 'Circuit Theory', faculty: 'Dr. Samuel Green' },
  { day: 'Monday', time: '14:00-15:00', room: 'CR-101', batch: 'CS-A', subject: 'Data Structures', faculty: 'Dr. Evelyn Reed' },

  { day: 'Tuesday', time: '09:00-10:00', room: 'CR-102', batch: 'CS-B', subject: 'Algorithms', faculty: 'Dr. Isabella Chen' },
  { day: 'Tuesday', time: '10:00-11:00', room: 'CR-101', batch: 'CS-A', subject: 'Operating Systems', faculty: 'Dr. Evelyn Reed' },
  { day: 'Tuesday', time: '12:00-13:00', room: 'ME-105', batch: 'ME-A', subject: 'Thermodynamics', faculty: 'Dr. Marcus Hayes' },
  { day: 'Tuesday', time: '15:00-16:00', room: 'LH-201', batch: 'EE-A', subject: 'Digital Electronics', faculty: 'Dr. Samuel Green' },

  { day: 'Wednesday', time: '10:00-11:00', room: 'CR-101', batch: 'CS-A', subject: 'Data Structures', faculty: 'Dr. Evelyn Reed' },
  { day: 'Wednesday', time: '11:00-12:00', room: 'CR-102', batch: 'CS-B', subject: 'Algorithms', faculty: 'Dr. Isabella Chen' },
  { day: 'Wednesday', time: '14:00-15:00', room: 'CE-Lab', batch: 'CE-A', subject: 'Surveying Lab', faculty: 'Dr. Leo Patel' },

  { day: 'Thursday', time: '09:00-10:00', room: 'LH-201', batch: 'EE-A', subject: 'Circuit Theory', faculty: 'Dr. Samuel Green' },
  { day: 'Thursday', time: '11:00-12:00', room: 'CR-101', batch: 'CS-A', subject: 'Operating Systems', faculty: 'Dr. Evelyn Reed' },
  { day: 'Thursday', time: '14:00-15:00', room: 'ME-105', batch: 'ME-A', subject: 'Thermodynamics', faculty: 'Dr. Marcus Hayes' },

  { day: 'Friday', time: '10:00-11:00', room: 'CR-102', batch: 'CS-B', subject: 'Database Management', faculty: 'Dr. Isabella Chen' },
  { day: 'Friday', time: '11:00-12:00', room: 'CR-101', batch: 'CS-A', subject: 'Data Structures', faculty: 'Dr. Evelyn Reed' },
  { day: 'Friday', time: '14:00-15:00', room: 'LH-201', batch: 'EE-A', subject: 'Digital Electronics', faculty: 'Dr. Samuel Green' },
];
