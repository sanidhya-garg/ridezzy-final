# Firebase Setup Instructions for Ridezzy Careers Page

## Setup Steps

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard

### 2. Enable Firestore Database
1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (you can secure it later)
4. Select a location close to your users

### 3. Enable Firebase Storage
1. Go to "Storage" in your Firebase project
2. Click "Get started"
3. Accept the default security rules for now

### 4. Get Your Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon to add a web app
4. Register your app
5. Copy the configuration object

### 5. Update the Configuration
1. Open `src/firebase/config.ts`
2. Replace the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

### 6. Seed Initial Job Data (One Time Only)
1. Open your browser's developer console while on the careers page
2. Run this code once to populate your database:

```javascript
import { seedJobData } from './src/firebase/seedData';
seedJobData();
```

Or temporarily add this to your component and remove after running once:

```typescript
import { seedJobData } from '../firebase/seedData';

// Add this to useEffect and remove after first run
useEffect(() => {
  // seedJobData(); // Uncomment, run once, then comment out again
}, []);
```

## Database Collections

### Jobs Collection (`jobs`)
- **Collection**: `jobs`
- **Document fields**:
  - `title` (string)
  - `department` (string)
  - `location` (string)
  - `type` (string)
  - `experience` (string)
  - `salary` (string)
  - `description` (string)
  - `responsibilities` (array of strings)
  - `requirements` (array of strings)
  - `benefits` (array of strings)
  - `isActive` (boolean)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)

### Applications Collection (`applications`)
- **Collection**: `applications`
- **Document fields**:
  - `jobId` (string) - Reference to job document ID
  - `jobTitle` (string)
  - `fullName` (string)
  - `email` (string)
  - `phone` (string)
  - `experience` (string)
  - `coverLetter` (string)
  - `resumeUrl` (string) - URL to uploaded resume in Firebase Storage
  - `resumeFileName` (string)
  - `status` (string) - 'pending', 'reviewing', 'shortlisted', 'rejected', 'hired'
  - `submittedAt` (timestamp)
  - `updatedAt` (timestamp)

## Security Rules

### Firestore Rules (Basic - Secure These Later!)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Jobs - Read-only for public
    match /jobs/{document} {
      allow read: if true;
      allow write: if false; // Only allow through admin interface
    }
    
    // Applications - Write-only for public
    match /applications/{document} {
      allow read: if false; // Only allow through admin interface
      allow create: if true; // Allow anyone to submit applications
      allow update, delete: if false;
    }
  }
}
```

### Storage Rules (Basic)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /resumes/{allPaths=**} {
      allow read, write: if true; // Secure this later with proper auth
    }
  }
}
```

## Features Implemented

✅ **Job Management**
- Fetch active jobs from Firestore
- Dynamic job listings with real-time data
- Professional job cards with expand/collapse functionality

✅ **Application System**
- Complete application form with validation
- Resume file upload to Firebase Storage
- Application data stored in Firestore
- Loading states and error handling

✅ **User Experience**
- Loading spinners while fetching data
- Form validation and submission feedback
- Responsive design for all devices
- Professional UI/UX design

## Admin Features (Future Enhancement)
To manage jobs and view applications, you can:
1. Use the Firebase Console directly
2. Build an admin dashboard
3. Use Firebase Admin SDK for backend management

## Next Steps
1. Set up proper authentication for admin features
2. Implement proper security rules
3. Add email notifications for new applications
4. Create an admin dashboard for HR team
5. Add application status tracking for candidates
