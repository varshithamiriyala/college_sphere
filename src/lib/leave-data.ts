
import { LeaveRequest } from './types';
import { addDays } from 'date-fns';

export const initialLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    facultyId: '2',
    facultyName: 'Dr. Samuel Green',
    facultyAvatar: 'https://picsum.photos/seed/samuel/200/200',
    startDate: addDays(new Date(), 5),
    endDate: addDays(new Date(), 7),
    reason: 'Family wedding.',
    status: 'pending',
  },
  {
    id: '2',
    facultyId: '3',
    facultyName: 'Dr. Marcus Hayes',
    facultyAvatar: 'https://picsum.photos/seed/marcus/200/200',
    startDate: addDays(new Date(), -10),
    endDate: addDays(new Date(), -9),
    reason: 'Personal leave.',
    status: 'approved',
  },
  {
    id: '3',
    facultyId: '1',
    facultyName: 'Dr. Evelyn Reed',
    facultyAvatar: 'https://picsum.photos/seed/evelyn/200/200',
    startDate: addDays(new Date(), 15),
    endDate: addDays(new Date(), 15),
    reason: 'Attending a conference.',
    status: 'pending',
  },
  {
    id: '4',
    facultyId: '4',
    facultyName: 'Dr. Isabella Chen',
    facultyAvatar: 'https://picsum.photos/seed/isabella/200/200',
    startDate: addDays(new Date(), -5),
    endDate: addDays(new Date(), -5),
    reason: 'Sick leave.',
    status: 'rejected',
  },
];
