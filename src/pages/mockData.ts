export interface Student {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface Classroom {
  id: number;
  title: string;
  subject: string;
  description?: string;
  backgroundId?: number;
  backgroundGradient?: string;
  backgroundName?: string;
  studentCount?: number;
  classType?: string;
  gradeLevel?: string;
  academicYear?: string;
  classSchedule?: string;
  classLocation?: string;
  classTags?: string;
}

export const students: Student[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com', status: 'active' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com', status: 'active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.brown@example.com', status: 'pending' },
  { id: 4, name: 'Diana Prince', email: 'diana.prince@example.com', status: 'inactive' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan.hunt@example.com', status: 'active' },
  { id: 6, name: 'Fiona Gallagher', email: 'fiona.gallagher@example.com', status: 'active' },
  { id: 7, name: 'George Miller', email: 'george.miller@example.com', status: 'pending' },
  { id: 8, name: 'Hannah Lee', email: 'hannah.lee@example.com', status: 'active' },
  { id: 9, name: 'Ivan Petrov', email: 'ivan.petrov@example.com', status: 'inactive' },
  { id: 10, name: 'Julia Roberts', email: 'julia.roberts@example.com', status: 'active' },
];

const DEFAULT_CLASSROOMS: Classroom[] = [
  // No default classrooms
];

export function getClassrooms(): Classroom[] {
  const data = localStorage.getItem('classrooms');
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return DEFAULT_CLASSROOMS;
    }
  }
  return DEFAULT_CLASSROOMS;
}

export function setClassrooms(classrooms: Classroom[]) {
  localStorage.setItem('classrooms', JSON.stringify(classrooms));
} 