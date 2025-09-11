import type { Faculty, TimetableEntry } from './types';

export const facultyData: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Evelyn Reed',
    avatar: 'https://picsum.photos/seed/EvelynReed/100/100',
    title: 'Professor',
    department: 'Computer Science',
    workingHours: { start: '09:00', end: '17:00' },
    leaveDates: [new Date(2024, 6, 22), new Date(2024, 6, 23)],
    submissions: {
      marks: 95,
      assignments: 100,
      attendance: 98,
    },
  },
  {
    id: '2',
    name: 'Dr. Samuel Green',
    avatar: 'https://picsum.photos/seed/SamuelGreen/100/100',
    title: 'Associate Professor',
    department: 'Electrical Engineering',
    workingHours: { start: '10:00', end: '18:00' },
    leaveDates: [new Date(2024, 7, 5)],
    submissions: {
      marks: 88,
      assignments: 92,
      attendance: 94,
    },
  },
  {
    id: '3',
    name: 'Dr. Clara Bennett',
    avatar: 'https://picsum.photos/seed/ClaraBennett/100/100',
    title: 'Assistant Professor',
    department: 'Mathematics',
    workingHours: { start: '08:30', end: '16:30' },
    leaveDates: [],
    submissions: {
      marks: 100,
      assignments: 100,
      attendance: 100,
    },
  },
  {
    id: '4',
    name: 'Dr. Marcus Hayes',
    avatar: 'https://picsum.photos/seed/MarcusHayes/100/100',
    title: 'Professor',
    department: 'Computer Science',
    workingHours: { start: '09:00', end: '17:00' },
    leaveDates: [new Date(2024, 7, 15), new Date(2024, 7, 16), new Date(2024, 7, 17)],
    submissions: {
      marks: 78,
      assignments: 85,
      attendance: 90,
    },
  },
    {
    id: '5',
    name: 'Dr. Olivia Chen',
    avatar: 'https://picsum.photos/seed/OliviaChen/100/100',
    title: 'HOD, Physics',
    department: 'Physics',
    workingHours: { start: '09:00', end: '17:00' },
    leaveDates: [],
    submissions: {
      marks: 92,
      assignments: 95,
      attendance: 99,
    },
  },
  {
    id: '6',
    name: 'Dr. Isaac Rodriguez',
    avatar: 'https://picsum.photos/seed/IsaacRodriguez/100/100',
    title: 'Lecturer',
    department: 'Mechanical Engineering',
    workingHours: { start: '09:30', end: '17:30' },
    leaveDates: [new Date(2024, 8, 2)],
    submissions: {
      marks: 85,
      assignments: 90,
      attendance: 93,
    },
  },
];

export const sampleTimetable: TimetableEntry[] = [
    // Monday
    { day: "Monday", time: "09:00-10:00", room: "CR-101", batch: "CS-A", subject: "Data Structures", faculty: "Dr. Evelyn Reed" },
    { day: "Monday", time: "10:00-11:00", room: "CR-102", batch: "EE-A", subject: "Circuit Theory", faculty: "Dr. Samuel Green" },
    { day: "Monday", time: "11:00-12:00", room: "CR-103", batch: "MATH-A", subject: "Calculus", faculty: "Dr. Clara Bennett" },
    { day: "Monday", time: "13:00-14:00", room: "CR-101", batch: "CS-B", subject: "Algorithms", faculty: "Dr. Marcus Hayes" },
    // Tuesday
    { day: "Tuesday", time: "09:00-10:00", room: "CR-102", batch: "EE-B", subject: "Digital Electronics", faculty: "Dr. Samuel Green" },
    { day: "Tuesday", time: "10:00-11:00", room: "CR-101", batch: "CS-A", subject: "Algorithms", faculty: "Dr. Marcus Hayes" },
    { day: "Tuesday", time: "11:00-12:00", room: "CR-201", batch: "PHY-A", subject: "Quantum Mechanics", faculty: "Dr. Olivia Chen" },
    { day: "Tuesday", time: "14:00-15:00", room: "CR-101", batch: "CS-A", subject: "Database Systems", faculty: "Dr. Evelyn Reed" },
    // Wednesday
    { day: "Wednesday", time: "09:00-10:00", room: "CR-103", batch: "MATH-B", subject: "Linear Algebra", faculty: "Dr. Clara Bennett" },
    { day: "Wednesday", time: "10:00-11:00", room: "ME-105", batch: "ME-A", subject: "Thermodynamics", faculty: "Dr. Isaac Rodriguez" },
    { day: "Wednesday", time: "11:00-12:00", room: "CR-101", batch: "CS-B", subject: "Data Structures", faculty: "Dr. Evelyn Reed" },
    // Thursday
    { day: "Thursday", time: "10:00-11:00", room: "CR-101", batch: "CS-A", subject: "Operating Systems", faculty: "Dr. Marcus Hayes" },
    { day: "Thursday", time: "11:00-12:00", room: "CR-102", batch: "EE-A", subject: "Signal Processing", faculty: "Dr. Samuel Green" },
    { day: "Thursday", time: "13:00-14:00", room: "CR-201", batch: "PHY-B", subject: "Electromagnetism", faculty: "Dr. Olivia Chen" },
    // Friday
    { day: "Friday", time: "09:00-10:00", room: "ME-105", batch: "ME-B", subject: "Fluid Mechanics", faculty: "Dr. Isaac Rodriguez" },
    { day: "Friday", time: "10:00-11:00", room: "CR-103", batch: "MATH-A", subject: "Differential Equations", faculty: "Dr. Clara Bennett" },
    { day: "Friday", time: "11:00-12:00", room: "CR-101", batch: "CS-B", subject: "Operating Systems", faculty: "Dr. Marcus Hayes" },
];
