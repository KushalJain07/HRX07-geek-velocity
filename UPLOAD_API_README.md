# Upload Document API Integration

This document describes the file upload functionality implemented in the Geek Velocity app.

## Overview

The upload document component now integrates with a backend API that handles file uploads to Google Cloud Storage (GCS). The implementation includes:

- File upload to GCS via backend API
- Metadata handling for document organization
- Error handling and user feedback
- Progress tracking and status display

## API Endpoints

### Upload File to GCS
- **Endpoint**: `POST /upload-gcs`
- **Content-Type**: `multipart/form-data`
- **Parameters**:
  - `file`: The file to upload
  - `metadata`: JSON string containing document metadata

### Extract Text from File
- **Endpoint**: `GET /extract-text?filename={filename}`
- **Returns**: Extracted text content from the uploaded file

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5001
```

### API Configuration

The API configuration is managed in `src/config/environment.ts`:

```typescript
export const config = {
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001",
    timeout: 30000, // 30 seconds
  },
  // ... other config
};
```

## Usage

### Uploading a Document

1. Navigate to the upload document page
2. Select the upload type (video, PDF, doc, image, other)
3. Fill in the document details:
   - Unit/Module
   - Chapter/Topic Name
   - Document Number
   - Document Details
4. Select a file to upload
5. Click "Upload Document"

### API Service Usage

```typescript
import { uploadService } from '../services/api';

// Upload a file
const metadata = {
  uploadType: "pdf",
  unitModule: "Unit 1",
  chapterTopic: "Introduction to Algebra",
  documentNumber: "1",
  details: "Basic algebraic concepts",
  classroomId: 123,
  title: "Unit 1 - Introduction to Algebra - PDF Document 1"
};

const result = await uploadService.uploadToGCS(file, metadata);

if (result.success) {
  console.log('Upload successful:', result.fileUrl);
} else {
  console.error('Upload failed:', result.error);
}
```

## File Structure

```
src/
├── services/
│   └── api.ts              # API service functions
├── config/
│   └── environment.ts      # Environment configuration
└── pages/
    └── UploadDocument.tsx  # Upload component
```

## Backend Requirements

Your backend API should implement the following endpoints:

### POST /upload-gcs
- Accept multipart/form-data
- Handle file upload to Google Cloud Storage
- Process metadata from the request
- Return response with file URL and GCS filename

### GET /extract-text
- Accept filename parameter
- Extract text from the specified file
- Return extracted text content

## Error Handling

The implementation includes comprehensive error handling:

- Network errors
- Server errors
- File validation errors
- Timeout handling

## Status Display

The upload component shows real-time status:

- **Uploading**: File is being uploaded
- **Success**: Upload completed successfully
- **Error**: Upload failed with error message

## File Validation

The component validates:

- File type based on upload type selection
- Required form fields
- File size limits (configurable)

## Local Storage

Uploaded documents are stored in localStorage for offline access:

```javascript
// Example localStorage structure
{
  "uploadedDocuments": [
    {
      "id": 1234567890,
      "type": "pdf",
      "title": "Unit 1 - Introduction to Algebra - PDF Document 1",
      "details": "Basic algebraic concepts",
      "fileName": "algebra_intro.pdf",
      "fileSize": "2.5 MB",
      "uploadDate": "2024-01-15T10:30:00.000Z",
      "classroomId": 123,
      "fileUrl": "https://storage.googleapis.com/...",
      "gcsFileName": "uploads/algebra_intro_123456.pdf"
    }
  ]
}
```

## Testing

To test the upload functionality:

1. Start your backend server on the configured port
2. Set the `VITE_API_BASE_URL` environment variable
3. Navigate to the upload document page
4. Try uploading different file types
5. Check the browser console for API responses

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from your frontend domain
2. **File Size Limits**: Check both frontend and backend file size limits
3. **API Timeout**: Increase timeout in configuration if uploading large files
4. **Network Errors**: Verify API endpoint is accessible and server is running

### Debug Mode

Enable debug logging by setting:

```typescript
// In src/services/api.ts
const apiClient = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request/response interceptors for debugging
apiClient.interceptors.request.use(request => {
  console.log('API Request:', request);
  return request;
});

apiClient.interceptors.response.use(response => {
  console.log('API Response:', response);
  return response;
});
``` 