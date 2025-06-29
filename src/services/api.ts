import axios from 'axios';
import { config } from '../config/environment';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// File upload interface
export interface UploadMetadata {
  uploadType: "video" | "pdf" | "doc" | "image" | "other";
  unitModule: string;
  chapterTopic: string;
  documentNumber: string;
  details: string;
  classroomId: number;
  title: string;
}

// Upload response interface
export interface UploadResponse {
  success: boolean;
  fileUrl?: string;
  gcsFileName?: string;
  message?: string;
  error?: string;
}

// File upload service
export const uploadService = {
  // Upload file to Google Cloud Storage
  uploadToGCS: async (file: File, metadata: UploadMetadata): Promise<UploadResponse> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("metadata", JSON.stringify(metadata));

      const response = await apiClient.post('https://game-backend-an7s.onrender.com/upload-gcs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        fileUrl: response.data.fileUrl,
        gcsFileName: response.data.gcsFileName,
        message: response.data.message || 'File uploaded successfully',
      };
    } catch (error) {
      console.error('Upload error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return {
            success: false,
            error: error.response.data?.error || error.response.statusText,
          };
        } else if (error.request) {
          return {
            success: false,
            error: 'No response from server (timeout or network error)',
          };
        } else {
          return {
            success: false,
            error: error.message,
          };
        }
      }
      
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Extract text from uploaded file
  extractText: async (filename: string): Promise<{ success: boolean; text?: string; error?: string }> => {
    try {
      const response = await apiClient.get(`/extract-text?filename=${encodeURIComponent(filename)}`);
      
      return {
        success: true,
        text: response.data.extractedtext || 'No text found',
      };
    } catch (error) {
      console.error('Text extraction error:', error);
      
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || error.message,
        };
      }
      
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Test API connection
  testConnection: async (): Promise<boolean> => {
    try {
      await apiClient.get('/health'); // Assuming you have a health endpoint
      return true;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  },
};

// Export the API client for direct use if needed
export default apiClient; 