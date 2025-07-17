# 🔥 URGENT: Firestore Rules Have Expired for "jobs" Database!

## Problem
Your Firestore security rules expired on July 9, 2025 for your custom "jobs" database. Today is July 17, 2025, which is why you're getting "Missing or insufficient permissions" errors.

## Quick Fix (Choose Option 1 or 2)

### Option 1: Extend Test Mode (Recommended for Development)
Replace your current rules with these updated rules for the "jobs" database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/jobs/documents {
    // Allow read/write access for 30 more days (expires August 16, 2025)
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 8, 16);
    }
  }
}
```

### Option 2: Permanent Test Mode (Not Recommended for Production)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/jobs/documents {
    // WARNING: This allows anyone to read/write your database
    // Only use for development/testing
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## How to Update Rules

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `ridezzy-vvj1mf`
3. **Navigate to Firestore Database**
4. **IMPORTANT**: Make sure you select the "jobs" database (not the default database)
5. **Click on "Rules" tab**
6. **Replace the existing rules** with Option 1 above
7. **Click "Publish"**

## Important Notes for Custom Database

- Your app is now configured to use the "jobs" database instead of the default database
- Make sure all your Firestore rules are applied to `/databases/jobs/documents` not `/databases/{database}/documents`
- When viewing data in Firebase Console, switch to the "jobs" database to see your collections

## After Updating Rules

1. Wait 1-2 minutes for rules to propagate
2. Refresh your React application
3. The careers page should now load job data successfully
4. You can then uncomment the seed function to populate initial data:

```typescript
// In CareersPage.tsx, uncomment this line ONCE:
await seedJobData();
```

## Security Note
These rules are for development only. Before going to production, implement proper security rules that validate user authentication and data access permissions.

## Test Your Fix
After updating the rules, check the browser console. You should see job data loading instead of permission errors.
