// Environment configuration
export const config = {
  // API Configuration
  api: {
    baseURL: "https://game-backend-an7s.onrender.com",
    timeout: 30000, // 30 seconds
  },
  
  // File upload configuration
  upload: {
    maxFileSize: 100 * 1024 * 1024, // 100MB
    allowedTypes: {
      video: ["video/*"],
      pdf: [".pdf"],
      doc: [".doc", ".docx"],
      image: [".png", ".jpg", ".jpeg", ".gif"],
      other: ["*"]
    }
  },
  
  // App configuration
  app: {
    name: "Geek Velocity",
    version: "1.0.0"
  }
};

// Environment helper functions
export const isDevelopment = true; // Simplified for now
export const isProduction = false; // Simplified for now

// API URL builder
export const getApiUrl = (endpoint: string): string => {
  return `${config.api.baseURL}${endpoint}`;
}; 