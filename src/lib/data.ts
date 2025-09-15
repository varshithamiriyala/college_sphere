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
    },
    ...Array.from({ length: 95 }, (_, i) => {
        const id = (i + 6).toString();
        const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Chris', 'Katie', 'Michael', 'Sarah', 'David', 'Laura'];
        const lastNames = ['Smith', 'Jones', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson'];
        const titles = ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Researcher'];
        const departments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Biotechnology', 'Information Technology', 'Chemical Engineering'];
        const name = `Dr. ${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]} ${i}`;

        return {
            id,
            name,
            avatar: `https://picsum.photos/seed/${id}/200/200`,
            title: titles[i % titles.length],
            department: departments[i % departments.length],
            workingHours: { start: '09:00', end: '17:00' },
            leaveDates: [],
            submissions: {
                marks: Math.floor(Math.random() * 21) + 80,
                assignments: Math.floor(Math.random() * 21) + 80,
                attendance: Math.floor(Math.random() * 21) + 80,
            },
        }
    })
];

const engineeringSubjects = {
  "Computer Science": [
    "Data Structures", "Algorithms", "Operating Systems", "Database Management", "Computer Networks",
    "Software Engineering", "Artificial Intelligence", "Machine Learning", "Web Development", "Compiler Design"
  ],
  "Electrical Engineering": [
    "Circuit Theory", "Digital Electronics", "Power Systems", "Control Systems", "VLSI Design",
    "Signals and Systems", "Electromagnetic Fields", "Power Electronics", "Microprocessors", "Communication Systems"
  ],
  "Mechanical Engineering": [
    "Thermodynamics", "Fluid Dynamics", "Machine Design", "Manufacturing Process", "Heat Transfer",
    "Theory of Machines", "Mechatronics", "Automobile Engineering", "Robotics", "Material Science"
  ],
  "Civil Engineering": [
    "Fluid Mechanics", "Surveying", "Structural Analysis", "Geotechnical Engineering", "Transportation Engineering",
    "Concrete Technology", "Construction Management", "Environmental Engineering", "Hydrology", "Building Materials"
  ],
  "Information Technology": [
    "Cloud Computing", "Cyber Security", "Data Mining", "Internet of Things", "Mobile Computing",
    "Big Data Analytics", "E-Commerce", "Network Security", "Cryptography", "Advanced Java"
  ],
  "Biotechnology": ["Microbiology", "Genetics", "Immunology", "Bioinformatics", "Molecular Biology"],
  "Chemical Engineering": ["Chemical Processes", "Organic Chemistry", "Process Control", "Mass Transfer", "Chemical Reaction Engineering"],
  "General": ["Engineering Mathematics", "Engineering Physics", "Engineering Chemistry", "Professional Communication", "Workshop Practice"]
};

const allSubjects = Object.values(engineeringSubjects).flat();

export const sampleTimetable: TimetableEntry[] = [
  { day: 'Monday', time: '09:00-10:00', room: 'CR-101', batch: 'CS-A', subject: 'Data Structures', faculty: 'Dr. Evelyn Reed' },
  { day: 'Monday', time: '10:00-11:00', room: 'CR-102', batch: 'CS-B', subject: 'Algorithms', faculty: 'Dr. Isabella Chen' },
  { day: 'Monday', time: '11:00-12:00', room: 'LH-201', batch: 'EE-A', subject: 'Circuit Theory', faculty: 'Dr. Samuel Green' },
  { day: 'Monday', time: '12:00-13:00', room: 'ME-101', batch: 'ME-A', subject: 'Thermodynamics', faculty: 'Dr. Marcus Hayes' },
  { day: 'Monday', time: '14:00-15:00', room: 'CR-101', batch: 'CS-A', subject: 'Data Structures Lab', faculty: 'Dr. Evelyn Reed' },
  { day: 'Monday', time: '15:00-16:00', room: 'CE-201', batch: 'CE-A', subject: 'Fluid Mechanics', faculty: 'Dr. Leo Patel' },
  { day: 'Monday', time: '16:00-17:00', room: 'IT-301', batch: 'IT-A', subject: 'Web Development', faculty: 'Dr. John Smith 0' },

  { day: 'Tuesday', time: '09:00-10:00', room: 'CR-102', batch: 'CS-B', subject: 'Algorithms Lab', faculty: 'Dr. Isabella Chen' },
  { day: 'Tuesday', time: '10:00-11:00', room: 'CR-101', batch: 'CS-A', subject: 'Operating Systems', faculty: 'Dr. Evelyn Reed' },
  { day: 'Tuesday', time: '11:00-12:00', room: 'ME-105', batch: 'ME-A', subject: 'Thermodynamics', faculty: 'Dr. Marcus Hayes' },
  { day: 'Tuesday', time: '12:00-13:00', room: 'LH-201', batch: 'EE-A', subject: 'Digital Electronics', faculty: 'Dr. Samuel Green' },
  { day: 'Tuesday', time: '14:00-15:00', room: 'BT-Lab', batch: 'BT-A', subject: 'Microbiology Lab', faculty: 'Dr. Jane Jones 1' },
  { day: 'Tuesday', time: '15:00-16:00', room: 'CH-101', batch: 'CH-A', subject: 'Chemical Processes', faculty: 'Dr. Alex Williams 2' },
  { day: 'Tuesday', time: '16:00-17:00', room: 'CR-103', batch: 'CS-C', subject: 'Discrete Mathematics', faculty: 'Dr. Emily Brown 3' },

  { day: 'Wednesday', time: '09:00-10:00', room: 'CR-101', batch: 'CS-A', subject: 'Data Structures', faculty: 'Dr. Evelyn Reed' },
  { day: 'Wednesday', time: '10:00-11:00', room: 'CR-102', batch: 'CS-B', subject: 'Algorithms', faculty: 'Dr. Isabella Chen' },
  { day: 'Wednesday', time: '11:00-12:00', room: 'CE-Lab', batch: 'CE-A', subject: 'Surveying Lab', faculty: 'Dr. Leo Patel' },
  { day: 'Wednesday', time: '12:00-13:00', room: 'IT-302', batch: 'IT-B', subject: 'Cloud Computing', faculty: 'Dr. Chris Davis 4' },
  { day: 'Wednesday', time: '14:00-15:00', room: 'LH-202', batch: 'EE-B', subject: 'Power Systems', faculty: 'Dr. Katie Miller 5' },
  { day: 'Wednesday', time: '15:00-16:00', room: 'ME-201', batch: 'ME-B', subject: 'Fluid Dynamics', faculty: 'Dr. Michael Wilson 6' },
  { day: 'Wednesday', time: '16:00-17:00', room: 'CR-104', batch: 'CS-D', subject: 'Computer Networks', faculty: 'Dr. Sarah Moore 7' },

  { day: 'Thursday', time: '09:00-10:00', room: 'LH-201', batch: 'EE-A', subject: 'Circuit Theory', faculty: 'Dr. Samuel Green' },
  { day: 'Thursday', time: '10:00-11:00', room: 'CR-101', batch: 'CS-A', subject: 'Operating Systems', faculty: 'Dr. Evelyn Reed' },
  { day: 'Thursday', time: '11:00-12:00', room: 'ME-105', batch: 'ME-A', subject: 'Thermodynamics Lab', faculty: 'Dr. Marcus Hayes' },
  { day: 'Thursday', time: '12:00-13:00', room: 'BT-101', batch: 'BT-A', subject: 'Genetics', faculty: 'Dr. David Taylor 8' },
  { day: 'Thursday', time: '14:00-15:00', room: 'CH-Lab', batch: 'CH-A', subject: 'Organic Chemistry Lab', faculty: 'Dr. Laura Anderson 9' },
  { day: 'Thursday', time: '15:00-16:00', room: 'IT-303', batch: 'IT-C', subject: 'Artificial Intelligence', faculty: 'Dr. John Smith 10' },
  { day: 'Thursday', time: '16:00-17:00', room: 'CR-105', batch: 'CS-E', subject: 'Software Engineering', faculty: 'Dr. Jane Jones 11' },

  { day: 'Friday', time: '09:00-10:00', room: 'CR-102', batch: 'CS-B', subject: 'Database Management', faculty: 'Dr. Isabella Chen' },
  { day: 'Friday', time: '10:00-11:00', room: 'CR-101', batch: 'CS-A', subject: 'Data Structures', faculty: 'Dr. Evelyn Reed' },
  { day: 'Friday', time: '11:00-12:00', room: 'LH-201', batch: 'EE-A', subject: 'Digital Electronics Lab', faculty: 'Dr. Samuel Green' },
  { day: 'Friday', time: '12:00-13:00', room: 'CE-202', batch: 'CE-B', subject: 'Structural Analysis', faculty: 'Dr. Alex Williams 12' },
  { day: 'Friday', time: '14:00-15:00', room: 'ME-202', batch: 'ME-B', subject: 'Machine Design', faculty: 'Dr. Emily Brown 13' },
  { day: 'Friday', time: '15:00-16:00', room: 'BT-102', batch: 'BT-B', subject: 'Immunology', faculty: 'Dr. Chris Davis 14' },
  { day: 'Friday', time: '16:00-17:00', room: 'IT-304', batch: 'IT-D', subject: 'Cyber Security', faculty: 'Dr. Katie Miller 15' },
  
  ...Array.from({ length: 80 }, (_, i) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'];
    const rooms = Array.from({ length: 50 }, (__, j) => `CR-${j + 101}`);
    const batches = ['CS-A', 'CS-B', 'CS-C', 'EE-A', 'EE-B', 'ME-A', 'ME-B', 'CE-A', 'CE-B', 'IT-A', 'IT-B', 'BT-A', 'CH-A'];
    const facultyIndex = i % facultyData.length;
    
    return {
        day: days[i % days.length],
        time: times[i % times.length],
        room: rooms[i % rooms.length],
        batch: batches[i % batches.length],
        subject: allSubjects[i % allSubjects.length],
        faculty: facultyData[facultyIndex].name,
    }
  })
];
