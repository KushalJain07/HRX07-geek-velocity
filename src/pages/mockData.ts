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
  classCode?: string;
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  x: number;
  y: number;
  constellation: string;
  difficulty: 'Novice' | 'Adept' | 'Expert' | 'Master' | 'Legend' | 'Mythic';
  rewards: string[];
  estimatedTime: string;
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

const classQuestData: Record<string, Quest[]> = {
  '1': [
    {
      id: 1,
      title: 'Stellar Genesis',
      description: 'Witness the birth of stars in the cosmic nursery. Master the fundamental forces that create light in the darkness.',
      unlocked: true,
      x: 15,
      y: 20,
      constellation: 'Orion Nebula',
      difficulty: 'Novice',
      rewards: ['Star Fragment', '100 XP'],
      estimatedTime: '15 min',
    },
    {
      id: 2,
      title: 'Quantum Drift',
      description: 'Navigate through quantum tunnels where reality bends. Learn to phase between dimensions.',
      unlocked: true,
      x: 40,
      y: 30,
      constellation: 'Andromeda',
      difficulty: 'Adept',
      rewards: ['Quantum Core', '250 XP'],
      estimatedTime: '25 min',
    },
  ],
  '2': [
    {
      id: 1,
      title: 'Ancient Civilizations',
      description: 'Explore the rise and fall of ancient empires.',
      unlocked: true,
      x: 20,
      y: 25,
      constellation: 'Babylon',
      difficulty: 'Novice',
      rewards: ['History Scroll', '80 XP'],
      estimatedTime: '10 min',
    },
    {
      id: 2,
      title: 'World Wars',
      description: 'Understand the causes and effects of the world wars.',
      unlocked: false,
      x: 60,
      y: 40,
      constellation: 'Europe',
      difficulty: 'Adept',
      rewards: ['Medal', '200 XP'],
      estimatedTime: '30 min',
    },
  ],
};

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

export function findClassroomByCode(classCode: string): Classroom | undefined {
  const classrooms = getClassrooms();
  console.log('Searching for classroom with code:', classCode);
  console.log('Available classrooms:', classrooms);
  const found = classrooms.find(classroom => classroom.classCode === classCode);
  console.log('Found classroom:', found);
  return found;
}

export function getQuestsForClass(classId: string): Quest[] {
  return classQuestData[classId] || [];
}

export function addQuestsForNewClass(classId: string) {
  if (classQuestData[classId]) return; // Don't overwrite if already exists

  // Generate some random but themed quests
  const questThemes = [
    {
      title: 'Galactic Initiation',
      description: 'Begin your cosmic journey and meet your crew.',
      constellation: 'Orion',
      difficulty: 'Novice',
      rewards: ['Initiate Badge', '60 XP'],
      estimatedTime: '10 min',
    },
    {
      title: 'Nebula Navigation',
      description: 'Chart a course through the mysterious nebula.',
      constellation: 'Nebula',
      difficulty: 'Adept',
      rewards: ['Navigator Pin', '120 XP'],
      estimatedTime: '20 min',
    },
    {
      title: 'Asteroid Analysis',
      description: 'Study the composition of asteroids in your sector.',
      constellation: 'Asteroid Belt',
      difficulty: 'Expert',
      rewards: ['Astro Medal', '200 XP'],
      estimatedTime: '25 min',
    },
    {
      title: 'Supernova Challenge',
      description: 'Survive and learn from a nearby supernova explosion.',
      constellation: 'Supernova',
      difficulty: 'Master',
      rewards: ['Survivor Trophy', '300 XP'],
      estimatedTime: '30 min',
    },
  ];

  // Shuffle and pick 2-4 quests for variety
  const shuffled = questThemes
    .map(q => ({ ...q, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, Math.floor(Math.random() * 3) + 2);

  classQuestData[classId] = shuffled.map((q, idx) => ({
    id: idx + 1,
    title: `${q.title} #${classId.slice(-3)}`,
    description: q.description,
    unlocked: idx === 0,
    x: 20 + Math.floor(Math.random() * 60),
    y: 20 + Math.floor(Math.random() * 60),
    constellation: q.constellation,
    difficulty: q.difficulty as Quest['difficulty'],
    rewards: q.rewards,
    estimatedTime: q.estimatedTime,
  }));
} 