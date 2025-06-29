const API_BASE_URL = 'http://localhost:5001/api';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  rank: string;
  bio: string;
  soulStones: number;
}

export interface StudentStats {
  totalQuests: number;
  completedQuests: number;
  activeClasses: number;
  rank: string;
}

export interface ClassQuest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface StudentClass {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  color: string;
  students: number;
  icon: string;
  completed: boolean;
  classCode: string;
  description: string;
  quests: ClassQuest[];
}

export interface Notification {
  id: number;
  message: string;
  time: string;
  type: 'quest' | 'xp' | 'pet' | 'class' | 'bonus';
}

export interface DashboardData {
  profile: StudentProfile;
  stats: StudentStats;
  classes: StudentClass[];
  notifications: Notification[];
}

export interface QuestCompletionResponse {
  message: string;
  newXP: number;
  newLevel: number;
  rank: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get student dashboard data
  async getStudentDashboard(userId: string): Promise<DashboardData> {
    return this.request<DashboardData>(`/students/dashboard/${userId}`);
  }

  // Complete a quest and get XP
  async completeQuest(userId: string, questId: string, xpReward: number = 50): Promise<QuestCompletionResponse> {
    return this.request<QuestCompletionResponse>(`/students/${userId}/complete-quest`, {
      method: 'POST',
      body: JSON.stringify({ questId, xpReward }),
    });
  }

  // Get leaderboard
  async getLeaderboard(): Promise<Array<{ name: string; email: string; xp: number }>> {
    return this.request<Array<{ name: string; email: string; xp: number }>>('/students/leaderboard');
  }

  // Login
  async login(email: string, password: string, role: string): Promise<{ message: string; user: any }> {
    return this.request<{ message: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  }

  // Signup
  async signup(name: string, email: string, password: string, role: string): Promise<{ message: string; user: any }> {
    return this.request<{ message: string; user: any }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
  }
}

export const apiService = new ApiService();
export default apiService; 